import { Controller } from '@nestjs/common';
import { AlunoService } from './aluno.service';
import { ApiTags } from '@nestjs/swagger';


@Controller('aluno')
export class AlunoController {
  constructor(private readonly alunoService: AlunoService) {}
}
