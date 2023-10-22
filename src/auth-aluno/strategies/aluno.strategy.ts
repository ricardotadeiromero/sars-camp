import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthAlunoService } from '../auth-aluno.service';

@Injectable()
export class AlunoStrategy extends PassportStrategy(Strategy,'aluno') {
  constructor(private authAlunoService: AuthAlunoService) {
    super({ usernameField: 'ra' });
  }

  validate(ra: string, password: string) {
    console.log(ra, password);
    return this.authAlunoService.validateUser(ra, password);
  }
}