import { Body, Controller, Get, Post, Session } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './model/user';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  async register(@Body() user: User): Promise<User> {
    const newUser = await this.userService.createUser(user);
    return newUser;
  }
}
