import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AuthService } from './auth.service';
import { Users } from 'src/entities/users';

@Injectable()
export class LocalSerializer extends PassportSerializer {
  constructor(
    private readonly authService: AuthService,
    @InjectRepository(Users) private usersRepository: Repository<Users>,
  ) {
    super();
  }

  serializeUser(user: Users) {
    return user.id;
  }

  async deserializeUser(userId: string): Promise<Users> {
    const user = await this.usersRepository.findOneOrFail({
      where: { id: +userId },
      select: ['id', 'email', 'nickname'],
      relations: ['Workspaces'],
    });

    return user;
  }
}
