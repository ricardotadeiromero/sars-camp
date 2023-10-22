import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AlunoService } from 'src/aluno/aluno.service';
import { Aluno } from 'src/aluno/model/aluno';
import * as bcrypt from 'bcrypt';
import { AlunoPayload } from 'src/aluno/model/alunoPayload';
import { AlunoToken } from 'src/aluno/model/alunoToken';

@Injectable()
export class AuthAlunoService {
    constructor(
        private readonly alunoService: AlunoService,
        private readonly jwtService: JwtService
    ){}

    async login(aluno:Aluno): Promise<AlunoToken>{
        const paylod: AlunoPayload = {
            username: aluno.ra,
            sub: aluno.id
        }
        return {
            access_token: this.jwtService.sign(paylod)
        }
    }

    async validateUser(ra:string, password:string): Promise<Aluno>{
        const validAluno = await this.alunoService.findAluno(ra);
        if(validAluno){ 
            const validPassword = await bcrypt.compare(password, validAluno.password);
            console.log(validPassword);
            if(validPassword){
                return {
                    ...validAluno,
                    password:undefined
                }
            }
        }
        throw new UnauthorizedException('Credenciais inválidas!');
    }
}
