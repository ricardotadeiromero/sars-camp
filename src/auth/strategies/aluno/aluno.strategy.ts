import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class AlunoStrategy extends PassportStrategy(Strategy,'aluno') {
  constructor(private authService: AuthService) {
    super({ usernameField: 'ra' });
  }

  validate(ra: string, password: string) {
    return this.authService.validateAluno(ra, password);
  }
}