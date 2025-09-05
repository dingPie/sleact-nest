import { PickType } from '@nestjs/swagger';
import { TokenType } from 'src/@common/types/token';
import { Users } from 'src/entities/users';

export class SignUpBodyDto extends PickType(Users, [
  'email',
  'nickname',
  'password',
]) {}

export class SignUpResDto extends TokenType {}
