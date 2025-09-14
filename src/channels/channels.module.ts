import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChannelsService } from './channels.service';
import { ChannelsController } from './channels.controller';
import { Channels } from 'src/entities/channels';
import { ChannelChats } from 'src/entities/channel-chats';
import { ChannelMembers } from 'src/entities/channel-members';
import { Users } from 'src/entities/users';
import { Workspaces } from 'src/entities/workspaces';
import { EventsModule } from 'src/events/events.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Channels,
      ChannelChats,
      ChannelMembers,
      Users,
      Workspaces,
    ]),
    EventsModule,
  ],
  providers: [ChannelsService],
  controllers: [ChannelsController],
})
export class ChannelsModule {}
