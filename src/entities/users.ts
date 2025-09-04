import {
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DateEntity } from 'src/@common/entities/date-entity';
import { ChannelChats } from './channel-chats';
import { ChannelMembers } from './channel-members';
import { Channels } from './channels';
import { DMs } from './dms';
import { Mentions } from './mentions';
import { WorkspaceMembers } from './workspace-members';
import { Workspaces } from './workspaces';

@Index('email', ['email'], { unique: true })
@Entity({ schema: 'sleact', name: 'users' })
export class Users extends DateEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'email', unique: true, length: 30 })
  email: string;

  @Column('varchar', { name: 'nickname', length: 30 })
  nickname: string;

  @Column('varchar', { name: 'password', length: 100, select: false })
  password: string;

  @OneToMany(() => ChannelChats, (channelchats) => channelchats.user)
  channelChats: ChannelChats[];

  @OneToMany(() => ChannelMembers, (channelmembers) => channelmembers.user)
  channelMembers: ChannelMembers[];

  @OneToMany(() => DMs, (dms) => dms.sender)
  sentDMs: DMs[];

  @OneToMany(() => DMs, (dms) => dms.receiver)
  receivedDMs: DMs[];

  @OneToMany(() => Mentions, (mentions) => mentions.sender)
  sentMentions: Mentions[];

  @OneToMany(() => Mentions, (mentions) => mentions.receiver)
  receivedMentions: Mentions[];

  @OneToMany(
    () => WorkspaceMembers,
    (workspacemembers) => workspacemembers.user,
  )
  workspaceMembers: WorkspaceMembers[];

  @OneToMany(() => Workspaces, (workspaces) => workspaces.owner)
  ownedWorkspaces: Workspaces[];

  @ManyToMany(() => Workspaces, (workspaces) => workspaces.members)
  @JoinTable({
    name: 'workspace_members',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'workspace_id',
      referencedColumnName: 'id',
    },
  })
  workspaces: Workspaces[];

  @ManyToMany(() => Channels, (channels) => channels.members)
  @JoinTable({
    name: 'channel_members',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'channel_id',
      referencedColumnName: 'id',
    },
  })
  channels: Channels[];
}
