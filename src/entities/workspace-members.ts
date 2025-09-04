import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { DateEntity } from 'src/@common/entities/date-entity';

import { Users } from './users';
import { Workspaces } from './workspaces';

@Index('user_id', ['user_id'], {})
@Entity('workspace_members', { schema: 'sleact' })
export class WorkspaceMembers extends DateEntity {
  @Column('int', { primary: true, name: 'workspace_id' })
  workspaceId: number;

  @Column('int', { primary: true, name: 'user_id' })
  userId: number;

  @Column('datetime', { name: 'logged_in_at', nullable: true })
  loggedInAt: Date | null;

  @ManyToOne(() => Workspaces, (workspaces) => workspaces.workspaceMembers, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'workspace_id', referencedColumnName: 'id' }])
  workspace: Workspaces;

  @ManyToOne(() => Users, (users) => users.workspaceMembers, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: Users;
}
