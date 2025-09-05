import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DmsController } from './dms.controller';
import { DmsService } from './dms.service';
import { DMs } from 'src/entities/dms';
import { Users } from 'src/entities/users';
import { Workspaces } from 'src/entities/workspaces';

@Module({
  imports: [TypeOrmModule.forFeature([DMs, Users, Workspaces])],
  controllers: [DmsController],
  providers: [DmsService],
})
export class DmsModule {}
