import { ApiProperty } from '@nestjs/swagger';
import { Channels } from 'src/entities/channels';

export class GetChannelByIdParamDto {
  @ApiProperty({
    description: 'url',
    example: 'url',
  })
  url: string;

  @ApiProperty({
    description: '채널 아이디',
    example: 1,
  })
  channelId: number;
}

export class GetChannelByIdResDto extends Channels {}
