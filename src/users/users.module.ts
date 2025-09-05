import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/entities/users';
import { ChannelChats } from 'src/entities/channel-chats';
import { ChannelMembers } from 'src/entities/channel-members';
import { DMs } from 'src/entities/dms';
import { Mentions } from 'src/entities/mentions';
import { WorkspaceMembers } from 'src/entities/workspace-members';
import { Workspaces } from 'src/entities/workspaces';
import { Channels } from 'src/entities/channels';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Users,
      ChannelChats,
      ChannelMembers,
      DMs,
      Mentions,
      WorkspaceMembers,
      Workspaces,
      Channels,
    ]),
  ],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
