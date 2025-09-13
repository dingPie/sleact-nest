import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { GetChannelsParamDto, GetChannelsResDto } from './dto/get-channels.dto';
import { ChannelsService } from './channels.service';
import {
  GetChannelByIdParamDto,
  GetChannelByIdResDto,
} from './dto/get-channel-by-id.dto';
import {
  CreateChannelBodyDto,
  CreateChannelParamDto,
  CreateChannelResDto,
} from './dto/create-channel.dto';
import {
  GetChannelMembersParamDto,
  GetChannelMembersResDto,
} from './dto/get-channel-members.dto';

@Controller('api/workspace/:url/channels')
export class ChannelsController {
  constructor(private channelsService: ChannelsService) {}

  /**
   * 채널 목록 조회
   * @param params
   * @returns
   */
  @Get()
  async getChannels(
    @Param() params: GetChannelsParamDto,
  ): Promise<GetChannelsResDto[]> {
    const result =
      await this.channelsService.getWorkspaceChannelsByUserId(params);

    return result;
  }

  /**
   * 채널 상세 조회
   * @param params
   * @returns
   */
  @Get(':id')
  async getChannelById(
    @Param() params: GetChannelByIdParamDto,
  ): Promise<GetChannelByIdResDto | null> {
    const result =
      await this.channelsService.getWorkspaceChannelsByChannelId(params);
    return result;
  }

  /**
   * 채널 생성
   * @param params
   * @param body
   * @returns
   */
  @Post()
  async createChannel(
    @Param() params: CreateChannelParamDto,
    @Body() body: CreateChannelBodyDto, // P_TODO:여기 DTO 만들기
  ): Promise<CreateChannelResDto> {
    const result = await this.channelsService.createWorkspaceChannels({
      ...params,
      ...body,
    });

    return result;
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
  async getChannelMembers(
    @Param() params: GetChannelMembersParamDto,
  ): Promise<GetChannelMembersResDto[]> {
    const result =
      await this.channelsService.getWorkspaceChannelMembers(params);
    return result;
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
