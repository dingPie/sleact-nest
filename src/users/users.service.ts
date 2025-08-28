import { Injectable } from '@nestjs/common';
import { SignInDto } from './dto/sign-in.dto';

@Injectable()
export class UsersService {
  signIn(body: SignInDto) {
    console.log(body);
  }
}
