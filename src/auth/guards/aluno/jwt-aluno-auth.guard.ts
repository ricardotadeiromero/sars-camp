import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAlunoAuthGuard extends AuthGuard('jwt-aluno') {
  canActivate(context: ExecutionContext) {
    // Add your custom authentication logic here
    // for example, call super.logIn(request) to establish a session.
    return super.canActivate(context);
  }

  handleRequest(err, aluno) {
    // You can throw an exception based on either "info" or "err" arguments
    if (err || !aluno) {
      
      throw err || new UnauthorizedException();
    }
    return aluno;
  }
}