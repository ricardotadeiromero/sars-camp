import {
    BadRequestException,
    Injectable,
    NestMiddleware,
  } from '@nestjs/common';
  import { NextFunction, Request, Response } from 'express';
  import { validate } from 'class-validator';
import { LoginRequestBody } from 'src/user/model/loginRequestBody';
import { LoginAlunoRequestBody } from 'src/aluno/model/loginAlunoRequestBody';
  
  @Injectable()
  export class LoginAlunoValidationMiddleware implements NestMiddleware {
    async use(req: Request, res: Response, next: NextFunction) {
      const body = req.body;
      const loginRequestBody = new LoginAlunoRequestBody();
      loginRequestBody.ra = body.ra;
      loginRequestBody.password = body.password;
      const validations = await validate(loginRequestBody);
  
      if (validations.length) {
        throw new BadRequestException(
          validations.reduce((acc, curr) => {
            return [...acc, ...Object.values(curr.constraints)];
          }, []),
        );
      }
  
      next();
    }
  }