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
import { LocalAuthGuard } from './guards/user/local-auth.guard';
import { Response as ResponseType } from 'express';
import { IsPublic } from './decorators/is-public.decorator';
import { AuthRequest } from 'src/user/model/authRequest';
import { PassThrough } from 'stream';
import { LocalAlunoAuthGuard } from './guards/aluno/local-aluno-auth.guard';
import { AuthAlunoRequest } from 'src/aluno/model/authAlunoRequest';
import {
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('auth')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'Rota para login de usuário',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  @ApiOkResponse({
    description: 'Retorna o token por string e por cookie',
  })
  @IsPublic()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Request() req: AuthRequest,
    @Res({ passthrough: true }) res: ResponseType,
  ) {
    const { access_token } = await this.authService.login(req.user);
    res.cookie('access_token', access_token, {});
    return access_token;
  }

  @ApiOperation({
    summary: 'Rota para login de autenticação do aluno',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  @ApiOkResponse({
    description: 'Retorna o token por string',
  })
  @IsPublic()
  @UseGuards(LocalAlunoAuthGuard)
  @Post('aluno/login')
  @HttpCode(HttpStatus.OK)
  async loginAluno(
    @Request() req: AuthAlunoRequest,
    @Res({ passthrough: true }) res: ResponseType,
  ) {
    console.log(req.user);
    const { access_token } = await this.authService.login(req.user);
    return access_token;
  }
}
