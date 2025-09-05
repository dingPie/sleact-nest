import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkspacesService } from './workspaces.service';
import { WorkspacesController } from './workspaces.controller';
import { Workspaces } from 'src/entities/workspaces';
import { WorkspaceMembers } from 'src/entities/workspace-members';
import { Users } from 'src/entities/users';
import { Channels } from 'src/entities/channels';

@Module({
  imports: [
    TypeOrmModule.forFeature([Workspaces, WorkspaceMembers, Users, Channels]),
  ],
  providers: [WorkspacesService],
  controllers: [WorkspacesController],
})
export class WorkspacesModule {}
