import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { SignInBodyDto, SignInResDto } from './dto/sign-in.dto';
import { UsersService } from './users.service';
import { GetUsersResDto } from './dto/get-users.dto';
import { GetUserResDto } from './dto/get-user.dto';
import { User } from 'src/@common/decorators/user.decorator';
import { UndefinedToNullInterceptor } from 'src/@common/interceptors/undefined-to-null.interceptor';
import { SignUpBodyDto, SignUpResDto } from './dto/sign-up.dto';

@UseInterceptors(UndefinedToNullInterceptor)
@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({
    summary: '사용자 목록 조회',
    description: '사용자 목록을 조회합니다.',
  })
  @Get()
  getUsers(@User() user): GetUsersResDto[] {
    console.log(user);

    return this.usersService.getUsers();
  }

  @ApiOperation({
    summary: '내 정보 조회',
    description: '토큰을 기반으로 내 정보를 조회합니다.',
  })
  @Get('me')
  getMe(@Req() req): GetUserResDto {
    console.log(req);

    return this.usersService.getMe();
  }

  @ApiOperation({
    summary: '로그인',
    description: '로그인 성공 시 토큰을 발급합니다.',
  })
  @Post('sign-in')
  signIn(@Body() body: SignInBodyDto): SignInResDto {
    return this.usersService.signIn(body);
  }

  @ApiOperation({
    summary: '회원가입',
    description: '회원가입 성공 시 토큰을 발급합니다.',
  })
  @Post('sign-up')
  async signUp(@Body() body: SignUpBodyDto): Promise<SignUpResDto> {
    const res = await this.usersService.signUp(body);
    return res;
  }

  @ApiOperation({
    summary: '로그아웃',
    description: '로큰을 만료시킵니다 (안쓰일수도).',
  })
  @Post('sign-out')
  signOut(@Req() req, @Res() res) {
    console.log(req, res);
  }
}
