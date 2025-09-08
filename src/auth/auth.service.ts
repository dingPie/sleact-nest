import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserType } from 'src/@common/types/user';
import { Users } from 'src/entities/users';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<UserType | null> {
    const user = await this.usersRepository.findOne({
      where: {
        email: email,
      },
      select: ['id', 'email', 'nickname', 'password'],
    });
    if (user && (await bcrypt.compare(password, user.password))) {
      return {
        id: user.id,
        email: user.email,
        nickname: user.nickname,
      };
    }
    return null;
  }
}
