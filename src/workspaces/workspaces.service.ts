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
    return this.workspacesRepository.save({
      name: body.name,
      url: body.url,
      ownerId: myId,
    });
  }
}
