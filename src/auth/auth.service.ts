import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/user/model/user';
import { UserService } from 'src/user/user.service';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserPayload } from 'src/user/model/userPaylod';
import { UserToken } from 'src/user/model/userToken';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService, private readonly jwtService: JwtService){}

    async login(user:User): Promise<UserToken>{
        const paylod: UserPayload ={
            username: user.username,
            sub: user.id
        }
        return {
            access_token: this.jwtService.sign(paylod)
        }
    }

    async validateUser(user:User): Promise<User>{
        const validUser = await this.userService.findUser(user);
        if(validUser){
            const validPassword = await bcrypt.compare(user.password, validUser.password);
            if(validPassword){
                return {
                    ...user,
                    password:undefined
                }
            }
        }
        throw new UnauthorizedException('Credenciais inválidas!');
    }
}
