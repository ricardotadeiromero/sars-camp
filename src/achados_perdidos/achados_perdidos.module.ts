import { Module } from '@nestjs/common';
import { AchadosPerdidosService } from './achados_perdidos.service';
import { AchadosPerdidosController } from './achados_perdidos.controller';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  controllers: [AchadosPerdidosController],
  providers: [AchadosPerdidosService,PrismaService],
})
export class AchadosPerdidosModule {}
