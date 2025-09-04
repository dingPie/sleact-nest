import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DateEntity } from 'src/@common/entities/date-entity';

import { Users } from './users';
import { Workspaces } from './workspaces';

@Index('workspace_id', ['workspace_id'], {})
@Index('dms_ibfk_2', ['sender_id'], {})
@Index('dms_ibfk_3', ['receiver_id'], {})
@Entity({ schema: 'sleact', name: 'dms' })
export class DMs extends DateEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('text', { name: 'content' })
  content: string;

  @Column('int', { name: 'workspace_id', nullable: true })
  workspaceId: number | null;

  @Column('int', { name: 'sender_id', nullable: true })
  senderId: number | null;

  @Column('int', { name: 'receiver_id', nullable: true })
  receiverId: number | null;

  @ManyToOne(() => Workspaces, (workspaces) => workspaces.dms, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'workspace_id', referencedColumnName: 'id' }])
  workspace: Workspaces;

  @ManyToOne(() => Users, (users) => users.sentDMs, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'sender_id', referencedColumnName: 'id' }])
  sender: Users;

  @ManyToOne(() => Users, (users) => users.receivedDMs, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'receiver_id', referencedColumnName: 'id' }])
  receiver: Users;
}
