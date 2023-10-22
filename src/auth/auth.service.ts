import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/user/model/user';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserPayload } from 'src/user/model/userPaylod';
import { UserToken } from 'src/user/model/userToken';
import { Aluno } from 'src/aluno/model/aluno';
import { AlunoService } from 'src/aluno/aluno.service';
import { AlunoToken } from 'src/aluno/model/alunoToken';
import { AlunoPayload } from 'src/aluno/model/alunoPayload';

@Injectable()
export class AuthService {
    constructor(private readonly alunoService: AlunoService, private readonly userService: UserService, private readonly jwtService: JwtService) { }

    async login(user: User): Promise<UserToken>;
    async login(aluno: Aluno): Promise<AlunoToken>;
    async login(data: User | Aluno): Promise<UserToken | AlunoToken> {
        if ("username" in data) {
            const payload: UserPayload = {
                username: (data as User).username,
                sub: (data as User).id
            };
            return {
                access_token: this.jwtService.sign(payload)
            } as UserToken;
        } 
        if ("ra" in data) {
            const payload: AlunoPayload = {
                username: (data as Aluno).ra,
                sub: (data as Aluno).id
            };
            return {
                access_token: this.jwtService.sign(payload)
            } as AlunoToken;
        }

        throw new Error("Invalid user or aluno type");
    }


    async validateUser(username: string, password: string): Promise<User> {
        const validUser = await this.userService.findUser(username);
        if (validUser) {
            const validPassword = await bcrypt.compare(password, validUser.password);
            console.log(validPassword);
            if (validPassword) {
                return {
                    ...validUser,
                    password: undefined
                }
            }
        }
        throw new UnauthorizedException('Credenciais inválidas!');
    }

    async validateAluno(ra: string, password: string): Promise<Aluno> {
        const validAluno = await this.alunoService.findAluno(ra);
        if (validAluno) {
            const validPassword = await bcrypt.compare(password, validAluno.password);
            console.log(validPassword);
            if (validPassword) {
                return {
                    ...validAluno,
                    password: undefined
                }
            }
        }
        throw new UnauthorizedException('Credenciais inválidas!');
    }
}
