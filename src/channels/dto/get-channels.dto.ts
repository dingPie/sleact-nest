import { ApiProperty } from '@nestjs/swagger';
import { Channels } from 'src/entities/channels';

export class GetChannelsParamDto {
  @ApiProperty({
    description: 'url',
    example: 'url',
  })
  url: string;

  @ApiProperty({
    description: '유저 아이디',
    example: 1,
  })
  userId: number;
}

export class GetChannelsResDto extends Channels {}
