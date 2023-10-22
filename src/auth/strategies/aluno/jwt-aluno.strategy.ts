import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserFromJwt } from 'src/user/model/userFromJwt';
import { Request as RequestType } from 'express';
import { UserPayload } from 'src/user/model/userPaylod';
import { AlunoPayload } from 'src/aluno/model/alunoPayload';
import { AlunoFromJwt } from 'src/aluno/model/alunoFromJwt';
@Injectable()
export class JwtAlunoStrategy extends PassportStrategy(Strategy,'jwt-aluno') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        JwtAlunoStrategy.extractJWT,
        ExtractJwt.fromAuthHeaderAsBearerToken()
      ]),
      ignoreExpiration: false,
      secretOrKey: 'fon',
    });
  }

  async validate(payload: AlunoPayload): Promise<AlunoFromJwt> {
    return {
      id: payload.sub,
      ra: payload.username,
    };
  }

  private static extractJWT(req: RequestType): string | null {
    if (req.cookies && req.cookies.access_token) {
      return req.cookies.access_token;
    }
    return null;
  }
}