import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { SignInDto } from './dto/sign-in.dto';
import { UsersService } from './users.service';

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers() {}

  @Get('me')
  getMe(@Req() req) {
    console.log(req);
  }

  @Post('sign-in') // 일부터 붙임
  signIn(@Body() body: SignInDto) {
    console.log(body);

    this.usersService.signIn(body);
  }

  @Post('login')
  login() {}

  @Post('logout')
  logout(@Req() req, @Res() res) {
    console.log(req, res);
  }
}
