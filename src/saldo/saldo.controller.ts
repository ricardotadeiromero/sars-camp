import { Controller, Get, UseGuards } from '@nestjs/common';
import { SaldoService } from './saldo.service';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { JwtAlunoAuthGuard } from 'src/auth-aluno/guards/jwt-aluno-auth.guard';
import { CurrentAluno } from 'src/auth-aluno/decorators/current-aluno.decorator';
import { Aluno } from 'src/aluno/model/aluno';

@Controller('saldo')
export class SaldoController {
  constructor(private readonly saldoService: SaldoService) {}


  @IsPublic()
  @UseGuards(JwtAlunoAuthGuard)
  @Get()
  async findSaldo(@CurrentAluno() aluno: Aluno){
    const saldo = await this.saldoService.findSaldo(aluno.id);
    return saldo;
  }
}
