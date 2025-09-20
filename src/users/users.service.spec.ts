import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Users } from 'src/entities/users';
import { WorkspaceMembers } from 'src/entities/workspace-members';
import { ChannelMembers } from 'src/entities/channel-members';
import { DataSource } from 'typeorm';

// 실제 Repository를 사용하지 않고 가짜 Repository를 사용해서 테스트를 해줌.
class MockUsersRepository {
  #data = [{ email: 'test@test.com', password: '', nickname: 'test' }];
  async findOne(options: {
    where: {
      email: string;
    };
    select: string[];
  }) {
    const result = this.#data.find(
      (user) => user.email === options.where.email,
    );
    return result || null;
  }

  async save(user: any) {
    return {
      id: 1,
      ...user,
    };
  }
}

class MockWorkspaceMembersRepository {
  async save(workspaceMember: any) {
    return {
      id: 1,
      ...workspaceMember,
    };
  }
}

class MockChannelMembersRepository {
  async save(channelMember: any) {
    return {
      id: 1,
      ...channelMember,
    };
  }
}

// DataSource Mock (트랜잭션 처리용)
class MockDataSource {
  createQueryRunner() {
    return {
      connect: jest.fn(),
      startTransaction: jest.fn(),
      commitTransaction: jest.fn(),
      rollbackTransaction: jest.fn(),
      release: jest.fn(),
      manager: {
        getRepository: jest.fn().mockReturnValue({
          save: jest.fn().mockResolvedValue({
            id: 1,
            email: 'test@test.com',
            nickname: 'test',
          }),
        }),
      },
    };
  }
}

describe('UsersService', () => {
  let service: UsersService;

  // 가짜 모듈을 만들어줌.
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(Users),
          useClass: MockUsersRepository,
        },
        {
          provide: getRepositoryToken(WorkspaceMembers),
          useClass: MockWorkspaceMembersRepository,
        },
        {
          provide: getRepositoryToken(ChannelMembers),
          useClass: MockChannelMembersRepository,
        },
        {
          provide: DataSource,
          useClass: MockDataSource,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('signIn 임시테스트', () => {
    const user = service.signIn({
      email: 'test@test.com',
      nickname: 'test',
      password: '',
    });
    expect(user).toBeDefined();
    expect(user.accessToken).toBeDefined();
    expect(user.refreshToken).toBeDefined();
  });
});
