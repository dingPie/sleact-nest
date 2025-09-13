import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChannelChats } from 'src/entities/channel-chats';
import { ChannelMembers } from 'src/entities/channel-members';
import { Channels } from 'src/entities/channels';
import { Users } from 'src/entities/users';
import { Workspaces } from 'src/entities/workspaces';
import { DataSource, MoreThan, Not, Repository } from 'typeorm';
import { GetChannelsParamDto } from './dto/get-channels.dto';
import { GetChannelByIdParamDto } from './dto/get-channel-by-id.dto';

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
    @InjectRepository(ChannelChats)
    private channelChatsRepository: Repository<ChannelChats>,
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
  async getWorkspaceChannelsByUserId({ url, userId }: GetChannelsParamDto) {
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

  async getWorkspaceChannelsByChannelId({
    url,
    channelId,
  }: GetChannelByIdParamDto) {
    const channels = await this.channelsRepository.findOne({
      where: { id: channelId, workspace: { url } },
      relations: ['workspace', 'members'],
    });

    return channels;
  }

  async createWorkspaceChannels({
    url,
    userId,
    name,
  }: {
    url: string;
    userId: number;
    name: string;
  }) {
    const workspace = await this.workspacesRepository.findOne({
      where: { url },
    });
    if (!workspace) {
      throw new NotFoundException('워크스페이스를 찾을 수 없습니다.');
    }

    const createdChannel = await this.channelsRepository.save({
      name,
      workspaceId: workspace.id,
    });
    await this.channelMembersRepository.save({
      channelId: createdChannel.id,
      userId,
    });

    return createdChannel;
  }

  async getWorkspaceChannelMembers({
    url,
    name,
  }: {
    url: string;
    name: string;
  }) {
    const members = await this.usersRepository
      .createQueryBuilder('user')
      .innerJoin('user.channels', 'channels', 'channels.name = :name', {
        name,
      })
      .innerJoin('channels.workspace', 'workspace', 'workspace.url = :url', {
        url,
      })
      .getMany();

    //  완전히 위와 같음
    // const members2 = await this.usersRepository.find({
    //   where: {
    //     channels: {
    //       name,
    //     },
    //     workspaces: {
    //       url,
    //     },
    //   },
    // });

    return members;
  }

  async createWorkspaceChannelMembers({
    url,
    name,
    email,
  }: {
    url: string;
    name: string;
    email: string;
  }) {
    const channel = await this.channelsRepository.findOne({
      where: { name, workspace: { url } },
    });
    const user = await this.usersRepository.findOne({
      where: { email },
    });

    if (!channel) {
      throw new NotFoundException('채널을 찾을 수 없습니다.');
    }

    if (!user) {
      throw new NotFoundException('유저를 찾을 수 없습니다.');
    }

    await this.channelMembersRepository.save({
      channelId: channel.id,
      userId: user.id,
    });
  }

  async getWorkspaceChannelChats({
    url,
    name,
    perPage,
    page,
  }: {
    url: string;
    name: string;
    perPage: number;
    page: number;
  }) {
    const chats = await this.channelChatsRepository.find({
      where: { channel: { name, workspace: { url } } },
      take: perPage,
      skip: (page - 1) * perPage,
      order: { createdAt: 'DESC' },
      relations: ['user'],
    });

    return chats;
  }

  async getChannelUnreadCount({
    url,
    name,
    after,
    userId,
  }: {
    url: string;
    name: string;
    after: Date;
    userId: number;
  }) {
    const channel = await this.channelsRepository.findOne({
      where: { name, workspace: { url } },
    });
    if (!channel) {
      throw new NotFoundException('채널을 찾을 수 없습니다.');
    }

    const unreadCount = await this.channelChatsRepository.count({
      where: {
        channel: { id: channel.id },
        createdAt: MoreThan(after),
        user: { id: Not(userId) },
      },
    });

    return unreadCount;
  }

  async postChat({
    url,
    name,
    content,
    userId,
  }: {
    url: string;
    name: string;
    content: string;
    userId: number;
  }) {
    const channel = await this.channelsRepository.findOne({
      where: { name, workspace: { url } },
    });
    if (!channel) {
      throw new NotFoundException('채널을 찾을 수 없습니다.');
    }

    await this.channelChatsRepository.save({
      channelId: channel.id,
      userId,
      content,
    });
  }
}
