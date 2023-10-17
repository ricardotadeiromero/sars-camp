import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { User } from './model/user';
import * as bcrypt from 'bcryptjs';


@Injectable()
export class UserService {
    constructor(private prisma: PrismaService){}

    async login(data: User){
        console.log(data);
        const user = await this.prisma.user.findFirst({
            where: {
                username: data.username
            }
        });
        console.log(user);
        if(!await bcrypt.compare(data.password,user.password)){
            throw new HttpException('Senha incorreta!',401);
        }
    }
}
