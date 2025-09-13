import { PickType } from '@nestjs/swagger';
import { Workspaces } from 'src/entities/workspaces';

export class CreateWorkspaceBodyDto extends PickType(Workspaces, [
  'name',
  'url',
]) {}

export class CreateWorkspaceResDto extends Workspaces {}
