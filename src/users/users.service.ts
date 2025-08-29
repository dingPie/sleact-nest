import { Injectable } from '@nestjs/common';
import { SignInBodyDto, SignInResDto } from './dto/sign-in.dto';
import { GetUserResDto } from './dto/get-user.dto';
import { GetUsersResDto } from './dto/get-users.dto';

@Injectable()
export class UsersService {
  getUsers(): GetUsersResDto[] {
    // P_TODO: 사용자 목록을 조회합니다.
    return [];
  }

  getMe(): GetUserResDto {
    // P_TODO: 토큰을 기반으로 사용자 정보를 조회합니다.
    return {
      id: 1,
      email: 'test@test.com',
      nickname: 'test',
    };
  }

  signIn(body: SignInBodyDto): SignInResDto {
    console.log(body);

    // P_TODO: 토큰 발급 로직 추가 해야함.
    return {
      accessToken: 'accessToken',
      refreshToken: 'refreshToken',
    };
  }
}
