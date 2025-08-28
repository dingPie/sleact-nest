import { Controller, Get, Post, Req, Res } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get()
  getUsers() {}

  @Get('me')
  getMe(@Req() req) {
    console.log(req);
  }

  @Post('create') // 일부터 붙임
  createUser() {}

  @Post('login')
  login() {}

  @Post('logout')
  logout(@Req() req, @Res() res) {
    console.log(req, res);
  }
}
