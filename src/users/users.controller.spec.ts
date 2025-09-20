import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

// UsersService Mock
class MockUsersService {
  getMe() {
    return {
      id: 1,
      email: 'test@test.com',
      nickname: 'test',
    };
  }

  signIn(body: any) {
    return {
      accessToken: 'mock-access-token',
      refreshToken: 'mock-refresh-token',
    };
  }
}

describe('UsersController', () => {
  let controller: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useClass: MockUsersService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getMe', () => {
    it('내 정보를 반환해야 함', () => {
      const mockReq = {};
      const result = controller.getMe(mockReq);

      expect(result).toBeDefined();
      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('email');
      expect(result).toHaveProperty('nickname');
    });
  });

  describe('signIn', () => {
    it('로그인 시 토큰을 반환해야 함', () => {
      const signInData = {
        email: 'test@test.com',
        password: 'password',
        nickname: 'test',
      };

      const result = controller.signIn(signInData);

      expect(result).toBeDefined();
      expect(result).toHaveProperty('accessToken');
      expect(result).toHaveProperty('refreshToken');
    });
  });
});
