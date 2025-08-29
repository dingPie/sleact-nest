import { ApiProperty } from '@nestjs/swagger';

export class TokenType {
  @ApiProperty({
    description: '액세스 토큰',
    example: 'accessToken',
  })
  public accessToken: string;

  @ApiProperty({
    description: '리프레시 토큰',
    example: 'refreshToken',
  })
  public refreshToken: string;
}
