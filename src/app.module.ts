import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CardapioModule } from './cardapio/cardapio.module';

@Module({
  imports: [CardapioModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
