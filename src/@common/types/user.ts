import { ApiProperty } from '@nestjs/swagger';

export class UserType {
  @ApiProperty({
    description: '사용자 아이디',
    example: 1,
  })
  public id: number;

  @ApiProperty({
    description: '사용자 이메일',
    example: 'user@example.com',
  })
  public email: string;

  @ApiProperty({
    description: '사용자 닉네임',
    example: '닉네임',
  })
  public nickname: string;
}
