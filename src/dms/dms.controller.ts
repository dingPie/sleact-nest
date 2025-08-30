import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';

@ApiParam({
  name: 'url',
  type: String,
  required: true,
  description: '워크스페이스 url',
})
@Controller('api/workspaces/:url/dms')
export class DmsController {
  @ApiOperation({
    summary: '채팅 목록 조회',
    description: '채팅 목록을 조회합니다.',
  })
  @ApiQuery({
    name: 'perPage',
    type: Number,
    required: false,
    description: '한 페이지에 보여지는 채팅 수',
  })
  @ApiQuery({
    name: 'page',
    type: Number,
    required: false,
    description: '불러올 페이지 번호',
  })
  @Get(':id/chats')
  getChats(
    @Param('url') params: { url: string; id: string },
    @Query() query: { perPage: number; page: number }, // P_TODO:여기 타입 지정해야 함.
  ) {
    console.log(params, query);
  }

  /**
   * 채팅 생성
   * @param params
   * @param body
   * @returns
   */
  @Post(':id/chats')
  postChat(
    @Param('url') params: { url: string; id: string },
    @Body() body: any, // P_TODO:여기 타입 지정해야 함.
  ) {
    console.log(params, body);
  }
}
