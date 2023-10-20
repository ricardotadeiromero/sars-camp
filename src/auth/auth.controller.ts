import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import {Response as ResponseType} from 'express';
import { IsPublic } from './decorators/is-public.decorator';
import { AuthRequest } from 'src/user/model/authRequest';
import { PassThrough } from 'stream';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @IsPublic()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Request() req: AuthRequest, @Res({ passthrough: true }) res: ResponseType) {
    const {access_token} = await this.authService.login(req.user);
    res.cookie('access_token', access_token,{
    });
    return access_token;
  }
}