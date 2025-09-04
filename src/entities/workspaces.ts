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
import { DateEntity } from '../@common/entities/date-entity';
import { Channels } from './channels';
import { DMs } from './dms';
import { Mentions } from './mentions';
import { WorkspaceMembers } from './workspace-members';
import { Users } from './users';

@Index('name', ['name'], { unique: true })
@Index('url', ['url'], { unique: true })
@Index('owner_id', ['owner_id'], {})
@Entity({ schema: 'sleact', name: 'workspaces' })
export class Workspaces extends DateEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'name', unique: true, length: 30 })
  name: string;

  @Column('varchar', { name: 'url', unique: true, length: 30 })
  url: string;

  @Column('int', { name: 'owner_id', nullable: true })
  ownerId: number | null;

  @OneToMany(() => Channels, (channels) => channels.workspace)
  channels: Channels[];

  @OneToMany(() => DMs, (dms) => dms.workspace)
  dms: DMs[];

  @OneToMany(() => Mentions, (mentions) => mentions.workspace)
  mentions: Mentions[];

  @OneToMany(
    () => WorkspaceMembers,
    (workspacemembers) => workspacemembers.workspace,
    { cascade: ['insert'] },
  )
  workspaceMembers: WorkspaceMembers[];

  @ManyToOne(() => Users, (users) => users.ownedWorkspaces, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'owner_id', referencedColumnName: 'id' }])
  owner: Users;

  @ManyToMany(() => Users, (users) => users.workspaces)
  members: Users[];
}
