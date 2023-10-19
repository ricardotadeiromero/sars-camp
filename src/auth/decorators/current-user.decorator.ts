import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthRequest } from 'src/user/model/authRequest';
import { User } from 'src/user/model/user';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): User => {
    const request = context.switchToHttp().getRequest<AuthRequest>();

    return request.user;
  },
);