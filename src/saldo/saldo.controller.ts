import { Controller, Get, UseGuards } from '@nestjs/common';
import { SaldoService } from './saldo.service';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { Aluno } from 'src/aluno/model/aluno';
import { JwtAlunoAuthGuard } from 'src/auth/guards/aluno/jwt-aluno-auth.guard';
import { CurrentAluno } from 'src/auth/decorators/current-aluno.decorator';

@Controller('saldo')
export class SaldoController {
  constructor(private readonly saldoService: SaldoService) {}


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
