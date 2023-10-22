import { IsString } from 'class-validator';

export class LoginAlunoRequestBody {
  @IsString()
  ra: string;

  @IsString()
  password: string;
}