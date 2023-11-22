import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { User } from './user/model/user';
import { CurrentUser } from './auth/decorators/current-user.decorator';
import { IsPublic } from './auth/decorators/is-public.decorator';
import { JwtAuthGuard } from './auth/guards/user/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @IsPublic()
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

}
