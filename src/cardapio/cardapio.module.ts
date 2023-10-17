import { Module } from '@nestjs/common';
import { CardapioService } from './cardapio.service';
import { CardapioController } from './cardapio.controller';
import { PrismaService } from 'src/database/prisma.service';
import { DateService } from './date.service';

@Module({
  controllers: [CardapioController],
  providers: [CardapioService,DateService,PrismaService],
})
export class CardapioModule {}
