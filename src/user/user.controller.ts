import { Body, Controller, Get, Post, Session } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './model/user';

type UserMeida = {
  id: string;
  username: string;
  email: string;
  restaurant: {
    id: string;
    name: string;
    address: string;
  }
}

type Payload = {
  id: string,
  restaurant: {
    id: string,
    role: "admin" | "employee"
  }
}

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/login')
  async login(@Body() body: User,@Session() session: Record<string,any>){
    await this.userService.login(body);
    session.username = body.username;
    return 'Login feito com sucesso';
  }

  @Get('/login')
  async getLogin(@Session() session: Record<string,any>){
    return session.username;
  }

  
}
