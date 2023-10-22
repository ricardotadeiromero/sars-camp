import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AlunoModule } from 'src/aluno/aluno.module';
import { AlunoStrategy } from './strategies/aluno.strategy';
import { LoginAlunoValidationMiddleware } from './middlewares/login-aluno-validation.middleware';
import { AuthAlunoController } from './auth-aluno.controller';
import { AuthAlunoService } from './auth-aluno.service';
import { JwtAlunoStrategy } from './strategies/jwt-aluno.strategy';

@Module({
  imports: [
    AlunoModule,
    PassportModule,
    JwtModule.register({
      secret: 'fon',
      signOptions: { expiresIn: '30d' },
    }),
  ],
  controllers: [AuthAlunoController],
  providers: [AuthAlunoService, AlunoStrategy, JwtAlunoStrategy],
})
export class AuthAlunoModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoginAlunoValidationMiddleware).forRoutes('loginAluno');
  }
}