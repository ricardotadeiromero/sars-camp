import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CardapioModule } from './cardapio/cardapio.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [CardapioModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
