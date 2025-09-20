import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { ChannelMembers } from 'src/entities/channel-members';
import { Users } from 'src/entities/users';
import { WorkspaceMembers } from 'src/entities/workspace-members';
import { DataSource, Repository } from 'typeorm';
import { GetUserResDto } from './dto/get-user.dto';
import { GetUsersResDto } from './dto/get-users.dto';
import { SignInBodyDto, SignInResDto } from './dto/sign-in.dto';
import { SignUpBodyDto, SignUpResDto } from './dto/sign-up.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
    private dataSource: DataSource,
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

    // transaction 시작
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    const user = await this.usersRepository.findOne({
      where: {
        email: email,
      },
    });

    if (user) {
      throw new UnauthorizedException('이미 존재하는 유저입니다.');
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    try {
      const createdUser = await queryRunner.manager.getRepository(Users).save({
        email: email,
        password: hashedPassword,
        nickname: nickname,
      });

      // const createdUser = await this.usersRepository.save({
      //   email: email,
      //   password: hashedPassword,
      //   nickname: nickname,
      // });

      await queryRunner.manager.getRepository(WorkspaceMembers).save({
        userId: createdUser.id,
        workspaceId: 1,
      });
      await queryRunner.manager.getRepository(ChannelMembers).save({
        userId: createdUser.id,
        channelId: 1,
      });

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }

    // P_TODO: 회원가입 성공 시 토큰 발급 로직 추가해야 함.
    return {
      accessToken: 'accessToken',
      refreshToken: 'refreshToken',
    };
  }
}
