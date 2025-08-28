import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';

@Controller('api/workspaces/:url/dms')
export class DmsController {
  @Get(':id/chats')
  getChats(
    @Param('url') params: { url: string; id: string },
    @Query() query: { perPage: number; page: number }, // P_TODO:여기 타입 지정해야 함.
  ) {
    console.log(params, query);
  }

  @Post(':id/chats')
  postChat(
    @Param('url') params: { url: string; id: string },
    @Body() body: any, // P_TODO:여기 타입 지정해야 함.
  ) {
    console.log(params, body);
  }
}
