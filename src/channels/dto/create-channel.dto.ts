import { ApiProperty } from '@nestjs/swagger';
import { Channels } from 'src/entities/channels';

export class CreateChannelParamDto {
  @ApiProperty({
    description: 'url',
    example: 'url',
  })
  url: string;
}

export class CreateChannelBodyDto {
  @ApiProperty({
    description: '유저 아이디',
    example: 1,
  })
  userId: number;

  @ApiProperty({
    description: '채널 이름',
    example: '테스트 채널',
  })
  name: string;
}

export class CreateChannelResDto extends Channels {}
