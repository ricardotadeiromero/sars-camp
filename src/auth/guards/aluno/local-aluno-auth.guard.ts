import {
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { AuthGuard } from '@nestjs/passport';
  
  @Injectable()
  export class LocalAlunoAuthGuard extends AuthGuard('aluno') {
    canActivate(context: ExecutionContext) {
      return super.canActivate(context);
    }
  
    handleRequest(err, aluno) {
      if (err || !aluno) {
        console.log(err);
        throw err || new UnauthorizedException();
      }
  
      return aluno;
    }
  }