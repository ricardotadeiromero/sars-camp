import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Aluno } from 'src/aluno/model/aluno';
import { AuthAlunoRequest } from 'src/aluno/model/authAlunoRequest';
import { AuthRequest } from 'src/user/model/authRequest';

export const CurrentAluno = createParamDecorator(
  (data: unknown, context: ExecutionContext): Aluno => {
    const request = context.switchToHttp().getRequest<AuthAlunoRequest>();

    return request.user;
  },
);