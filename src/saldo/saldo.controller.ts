import { Controller, Get, UseGuards } from '@nestjs/common';
import { SaldoService } from './saldo.service';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { Aluno } from 'src/aluno/model/aluno';
import { JwtAlunoAuthGuard } from 'src/auth/guards/aluno/jwt-aluno-auth.guard';
import { CurrentAluno } from 'src/auth/decorators/current-aluno.decorator';
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

@ApiTags('saldo')
@Controller('saldo')
export class SaldoController {
  constructor(private readonly saldoService: SaldoService) {}

  @ApiOperation({
    summary: 'A partir do token enviado pelo header da requisição, busca o saldo do aluno autenticado e retorná-lo junto com o nome do aluno',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  @ApiOkResponse({
    description: 'Sucesso!',
  })
  @ApiNotFoundResponse({
    description: 'Saldo não encontrado',
  })
  @IsPublic()
  @UseGuards(JwtAlunoAuthGuard)
  @Get()
  async findSaldo(@CurrentAluno() aluno: Aluno){
    const name = aluno.name;
    const saldo = await this.saldoService.findSaldo(aluno.id);
    return {
      name,saldo
    };
  }
}
