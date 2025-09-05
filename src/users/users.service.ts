import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { SignInBodyDto, SignInResDto } from './dto/sign-in.dto';
import { GetUserResDto } from './dto/get-user.dto';
import { GetUsersResDto } from './dto/get-users.dto';
import { SignUpBodyDto, SignUpResDto } from './dto/sign-up.dto';
import { Repository } from 'typeorm';
import { Users } from 'src/entities/users';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

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
    // P_TODO: 토큰 발급 로직 추가 해야함.

    console.log(body);

    return {
      accessToken: 'accessToken',
      refreshToken: 'refreshToken',
    };
  }

  async signUp(body: SignUpBodyDto): Promise<SignUpResDto> {
    const { email, password, nickname } = body;
    if (!email || !password || !nickname) {
      throw new HttpException('요청 값이 올바르지 않습니다.', 400);
    }

    try {
      const users = await this.usersRepository.findOne({
        where: {
          email: email,
        },
      });

      if (users) {
        // P_TODO: 이미 존재하는 유저 에러.
        throw new UnauthorizedException('이미 존재하는 유저입니다.');
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      console.log(hashedPassword);

      this.usersRepository.create({
        email: email,
        password: hashedPassword,
        nickname: nickname,
      });

      // P_TODO: 회원가입 성공 시 토큰 발급 로직 추가해야 함.
      return {
        accessToken: 'accessToken',
        refreshToken: 'refreshToken',
      };
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException('회원가입에 실패했습니다.');
    }
  }
}
