import { Module } from '@nestjs/common';
import { SaldoService } from './saldo.service';
import { SaldoController } from './saldo.controller';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  controllers: [SaldoController],
  providers: [SaldoService,PrismaService],
})
export class SaldoModule {}
