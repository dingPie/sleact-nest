import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DateEntity } from 'src/@common/entities/date-entity';
import { ChannelChats } from './channel-chats';
import { ChannelMembers } from './channel-members';
import { Users } from './users';
import { Workspaces } from './workspaces';

@Index('workspace_id', ['workspace_id'], {})
@Entity({ schema: 'sleact' })
export class Channels extends DateEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'name', length: 30 })
  name: string;

  @Column('tinyint', {
    name: 'private',
    nullable: true,
    width: 1,
    default: () => "'0'",
  })
  private: boolean | null;

  @Column('int', { name: 'workspace_id', nullable: true })
  workspaceId: number | null;

  @OneToMany(() => ChannelChats, (channelchats) => channelchats.channel)
  channelChats: ChannelChats[];

  @OneToMany(() => ChannelMembers, (channelMembers) => channelMembers.channel, {
    cascade: ['insert'],
  })
  channelMembers: ChannelMembers[];

  @ManyToMany(() => Users, (users) => users.channels)
  members: Users[];

  @ManyToOne(() => Workspaces, (workspaces) => workspaces.channels, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'workspace_id', referencedColumnName: 'id' }])
  workspace: Workspaces;
}
