import { DateEntity } from '../@common/entities/date-entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Channels } from './channels';
import { Users } from './users';

@Index('IDX_channel_chats_user_id', ['userId'], {})
@Index('IDX_channel_chats_channel_id', ['channelId'], {})
@Entity({ schema: 'sleact', name: 'channel_chats' })
export class ChannelChats extends DateEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('text', { name: 'content' })
  content: string;

  @Column('int', { name: 'user_id', nullable: true })
  userId: number | null;

  @Column('int', { name: 'channel_id', nullable: true })
  channelId: number | null;

  @ManyToOne(() => Users, (users) => users.channelChats, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: Users;

  @ManyToOne(() => Channels, (channels) => channels.channelChats, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'channel_id', referencedColumnName: 'id' }])
  channel: Channels;
}
