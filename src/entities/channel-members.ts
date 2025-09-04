import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { DateEntity } from '../@common/entities/date-entity';
import { Channels } from './channels';
import { Users } from './users';

@Index('user_id', ['user_id'], {})
@Entity({ schema: 'sleact', name: 'channel_members' })
export class ChannelMembers extends DateEntity {
  @Column('int', { primary: true, name: 'channel_id' })
  channelId: number;

  @Column('int', { primary: true, name: 'user_id' })
  userId: number;

  @ManyToOne(() => Channels, (channels) => channels.channelMembers, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'channel_id', referencedColumnName: 'id' }])
  channel: Channels;

  @ManyToOne(() => Users, (users) => users.channelMembers, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: Users;
}
