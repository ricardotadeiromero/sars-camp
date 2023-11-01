import { Module } from '@nestjs/common';
import { AlunoService } from './aluno.service';
import { AlunoController } from './aluno.controller';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  controllers: [AlunoController],
  providers: [AlunoService,PrismaService],
  exports: [AlunoService]
})
export class AlunoModule {}
