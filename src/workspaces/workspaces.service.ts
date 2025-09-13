import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChannelMembers } from 'src/entities/channel-members';
import { Channels } from 'src/entities/channels';
import { Users } from 'src/entities/users';
import { WorkspaceMembers } from 'src/entities/workspace-members';
import { Workspaces } from 'src/entities/workspaces';
import { DataSource, Repository } from 'typeorm';
import { CreateWorkspaceBodyDto } from './dto/create.dto';

@Injectable()
export class WorkspacesService {
  constructor(
    @InjectRepository(Workspaces)
    private workspacesRepository: Repository<Workspaces>,
    @InjectRepository(Channels)
    private channelsRepository: Repository<Channels>,
    @InjectRepository(WorkspaceMembers)
    private workspaceMembersRepository: Repository<WorkspaceMembers>,
    @InjectRepository(ChannelMembers)
    private channelMembersRepository: Repository<ChannelMembers>,
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    private dataSource: DataSource,
  ) {}

  async findById(id: number) {
    return this.workspacesRepository.findOne({ where: { id } });
  }

  async findMyWorkspaces(myId: number) {
    return this.workspacesRepository.find({
      where: {
        workspaceMembers: { userId: myId },
      },
    });
  }

  async createWorkspace(myId: number, body: CreateWorkspaceBodyDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const createdWorkspace = await queryRunner.manager
        .getRepository(Workspaces)
        .save({
          name: body.name,
          url: body.url,
          ownerId: myId,
        });

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [_, createdChannel] = await Promise.all([
        queryRunner.manager.getRepository(WorkspaceMembers).save({
          userId: myId,
          workspaceId: createdWorkspace.id,
        }),

        queryRunner.manager.getRepository(Channels).save({
          name: '일반',
          workspaceId: createdWorkspace.id,
          userId: myId,
        }),
      ]);
      await queryRunner.manager.getRepository(ChannelMembers).save({
        userId: myId,
        channelId: createdChannel.id,
      });

      await queryRunner.commitTransaction();
      return createdWorkspace;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async getWorkspaceMembers(url: string) {
    const members = await this.usersRepository
      .createQueryBuilder('user')
      .innerJoin('user.workspaceMembers', 'workspaceMember')
      .innerJoin(
        'workspaceMember.workspace',
        'workspace',
        'workspace.url = :url',
        { url },
      )
      .getMany();

    return members;
  }

  // async getWorkspaceChannels(workspaceId: number) {
  //   return this.channelsRepository.find({ where: { workspaceId } });
  // }
}
