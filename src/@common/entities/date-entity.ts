import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

export class DateEntity {
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}
