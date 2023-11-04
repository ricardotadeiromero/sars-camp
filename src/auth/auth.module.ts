import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './strategies/user/local.strategy';
import { JwtStrategy } from './strategies/user/jwt.strategy';
import { LoginValidationMiddleware } from './middlewares/login-validation.middleware';
import { AlunoModule } from 'src/aluno/aluno.module';
import { JwtAlunoStrategy } from './strategies/aluno/jwt-aluno.strategy';
import { AlunoStrategy } from './strategies/aluno/aluno.strategy';
import { LoginAlunoValidationMiddleware } from './middlewares/login-aluno-validation.middleware';

@Module({
  imports: [
    UserModule,
    AlunoModule,
    PassportModule,
    JwtModule.register({
      secret: "fon",
      signOptions: { expiresIn: '30d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy,AlunoStrategy,JwtAlunoStrategy],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoginValidationMiddleware).forRoutes('login');
    consumer.apply(LoginAlunoValidationMiddleware).forRoutes('aluno/login');
  }
}