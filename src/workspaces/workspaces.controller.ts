import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';

@Controller('api/workspaces')
export class WorkspacesController {
  /**
   * 내 워크스페이스 목록 조회
   * @returns
   */
  @Get()
  getMyWorkspaces() {
    console.log('getMyWorkspaces');
  }

  /**
   * 워크스페이스 생성
   * @returns
   */
  @Post()
  createWorkspace() {
    console.log('createWorkspace');
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
  getWorkspaceMemberById(@Param() params: { url: string; id: string }) {
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
