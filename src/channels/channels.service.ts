import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChannelMembers } from 'src/entities/channel-members';
import { Channels } from 'src/entities/channels';
import { Users } from 'src/entities/users';
import { Workspaces } from 'src/entities/workspaces';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class ChannelsService {
  constructor(
    @InjectRepository(Workspaces)
    private workspacesRepository: Repository<Workspaces>,
    @InjectRepository(Channels)
    private channelsRepository: Repository<Channels>,
    @InjectRepository(ChannelMembers)
    private channelMembersRepository: Repository<ChannelMembers>,
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    private dataSource: DataSource,
  ) {}

  async findById(id: number) {
    return this.channelsRepository.findOne({ where: { id } });
  }

  /**
   * 워크스페이스 채널 목록 조회
   * @param url 워크스페이스 url
   * @param userId 사용자 id
   * @returns 워크스페이스 채널 목록에 유저와 워크스페이스 정보 포함하여 반환
   */
  async getWorkspaceChannelsByUserId(url: string, userId: number) {
    const channels = await this.channelsRepository
      .createQueryBuilder('channel')
      .innerJoinAndSelect(
        'channel.members',
        'members',
        'members.userId = :userId',
        {
          userId,
        },
      )
      .innerJoinAndSelect(
        'channel.workspace',
        'workspace',
        'workspace.url = :url',
        {
          url,
        },
      )
      .getMany();

    return channels;
  }

  async getWorkspaceChannelsByChannelId(url: string, channelId: number) {
    const channels = await this.channelsRepository.findOne({
      where: { id: channelId, workspace: { url } },
      relations: ['workspace', 'members'],
    });

    return channels;
  }
}
