import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseArrayPipe,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { User } from 'src/@common/decorators/user.decorator';
import { UserType } from 'src/@common/types/user';
import {
  CreateWorkspaceBodyDto,
  CreateWorkspaceResDto,
} from './dto/create.dto';
import { WorkspacesService } from './workspaces.service';

@Controller('api/workspaces')
export class WorkspacesController {
  constructor(private readonly workspacesService: WorkspacesService) {}
  /**
   * 내 워크스페이스 목록 조회
   * @returns
   */
  @Get()
  getMyWorkspaces(@User() user: UserType) {
    console.log(user);
    console.log('getMyWorkspaces');
  }

  /**
   * 워크스페이스 생성
   * @returns
   */
  @Post()
  async createWorkspace(
    @User() user: UserType,
    @Body() body: CreateWorkspaceBodyDto,
  ): Promise<CreateWorkspaceResDto> {
    const res = await this.workspacesService.createWorkspace(user.id, body);
    return res;
  }

  /**
   * 워크스페이스 멤버 목록 조회
   * @param params
   * @returns
   */
  @Get(':url/members')
  getWorkspaceMembers(@Param() params: { url: string }) {
    console.log(params);
  }

  /**
   * 워크스페이스 멤버 상세 조회
   * @param params
   * @returns
   */
  @Get(':url/members/:id')
  getWorkspaceMemberById(
    @Param(ParseIntPipe) params: { url: string; id: string },
  ) {
    console.log(params);
  }

  @Get(':url/members/:id')
  getWorkspaceMemberById1(
    @Param(new ParseArrayPipe({ items: String, separator: ',' }))
    params: {
      url: string;
      id: string;
    },
  ) {
    console.log(params);
  }

  /**
   * 워크스페이스 멤버 초대
   * @param params
   * @param body
   * @returns
   */
  @Post(':url/members')
  inviteMembersToWorkspace(
    @Param() params: { url: string },
    @Body() body: { email: string }, // P_TODO:여기 DTO 만들기
  ) {
    console.log(params, body);
  }

  /**
   * 워크스페이스 멤버 삭제
   * @param params
   * @returns
   */
  @Delete(':url/members/:id')
  deleteWorkspaceFromMember(@Param() params: { url: string; id: string }) {
    console.log(params);
  }
}
