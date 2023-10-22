import { Controller,Request, HttpCode, HttpStatus, Post, UseGuards, Res, Get } from '@nestjs/common';
import { AuthAlunoService } from './auth-aluno.service';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { LocalAlunoAuthGuard } from './guards/local-aluno-auth.guard';
import {Response as ResponseType} from 'express';
import { AuthAlunoRequest } from 'src/aluno/model/authAlunoRequest';
import { JwtAlunoAuthGuard } from './guards/jwt-aluno-auth.guard';
import { CurrentAluno } from './decorators/current-aluno.decorator';
import { Aluno } from 'src/aluno/model/aluno';

@Controller('auth-aluno')
export class AuthAlunoController {
  constructor(private readonly authAlunoService: AuthAlunoService) {}

  @IsPublic()
  @UseGuards(LocalAlunoAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async loginAluno(@Request() req: AuthAlunoRequest, @Res({ passthrough: true }) res: ResponseType) {
    console.log(req.user);
    const {access_token} = await this.authAlunoService.login(req.user);
    res.cookie('access_token', access_token,{
    });
    return access_token;
  }

  @IsPublic()
  @UseGuards(JwtAlunoAuthGuard)
  @Get('me')
  async me(@CurrentAluno() aluno: Aluno){
    return aluno;
  }
}
