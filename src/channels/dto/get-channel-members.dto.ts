import { ApiProperty } from '@nestjs/swagger';
import { Users } from 'src/entities/users';

export class GetChannelMembersParamDto {
  @ApiProperty({
    description: 'url',
    example: 'url',
  })
  url: string;

  @ApiProperty({
    description: '채널 이름',
    example: '테스트 채널',
  })
  name: string;
}

export class GetChannelMembersResDto extends Users {}
