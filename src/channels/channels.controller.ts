import { Body, Controller, Get, Param, Post } from '@nestjs/common';

@Controller('api/workspace/:url/channels')
export class ChannelsController {
  /**
   * 채널 목록 조회
   * @param params
   * @returns
   */
  @Get()
  getChannels(@Param() params: { url: string }) {
    console.log(params);
  }

  /**
   * 채널 상세 조회
   * @param params
   * @returns
   */
  @Get(':id')
  getChannelById(@Param() params: { url: string; id: string }) {
    console.log(params);
  }

  /**
   * 채널 생성
   * @param params
   * @param body
   * @returns
   */
  @Post()
  createChannel(
    @Param('url') params: { url: string },
    @Body() body: { name: string }, // P_TODO:여기 DTO 만들기
  ) {
    console.log(params, body);
  }

  /**
   * 채널 이미지 업로드
   * @param params
   * @param body
   * @returns
   */
  @Post('images')
  uploadChannelImage(
    @Param() params: { url: string },
    // P_TODO: 이미지 보내는거 확인
    // @Body() body: { image: string }, // P_TODO:여기 DTO 만들기
  ) {
    console.log(params);
  }

  /**
   * 채널 멤버 목록 조회
   * @param params
   * @returns
   */
  @Get('members')
  getChannelMembers(@Param() params: { url: string }) {
    console.log(params);
  }

  /**
   * 채널 멤버 초대
   * @param params
   * @param body
   * @returns
   */
  @Post('members')
  inviteMembers(
    @Param() params: { url: string },
    @Body() body: { email: string }, // P_TODO:여기 DTO 만들기
  ) {
    console.log(params, body);
  }
}
