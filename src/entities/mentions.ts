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
@Index('sender_id', ['sender_id'], {})
@Index('receiver_id', ['receiver_id'], {})
@Entity({ schema: 'sleact', name: 'mentions' })
export class Mentions extends DateEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('enum', { name: 'category', enum: ['chat', 'dm', 'system'] })
  category: 'chat' | 'dm' | 'system';

  @Column('int', { name: 'chat_id', nullable: true })
  chatId: number | null;

  @Column('int', { name: 'workspace_id', nullable: true })
  workspaceId: number | null;

  @Column('int', { name: 'sender_id', nullable: true })
  senderId: number | null;

  @Column('int', { name: 'receiver_id', nullable: true })
  receiverId: number | null;

  @ManyToOne(() => Workspaces, (workspaces) => workspaces.mentions, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'workspace_id', referencedColumnName: 'id' }])
  workspace: Workspaces;

  @ManyToOne(() => Users, (users) => users.sentMentions, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'sender_id', referencedColumnName: 'id' }])
  sender: Users;

  @ManyToOne(() => Users, (users) => users.receivedMentions, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'receiver_id', referencedColumnName: 'id' }])
  receiver: Users;
}
