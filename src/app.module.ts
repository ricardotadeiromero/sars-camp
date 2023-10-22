import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CardapioModule } from './cardapio/cardapio.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/user/jwt-auth.guard';
import { AlunoModule } from './aluno/aluno.module';
import { AuthAlunoModule } from './auth-aluno/auth-aluno.module';
import { SaldoModule } from './saldo/saldo.module';

@Module({
  imports: [UserModule, AuthModule, CardapioModule, AlunoModule, AuthAlunoModule, SaldoModule],
  controllers: [AppController],
  providers: [AppService,{
    provide: APP_GUARD,
    useClass: JwtAuthGuard,
  }],
})
export class AppModule {}
