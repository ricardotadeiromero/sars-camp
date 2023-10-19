import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { User } from './model/user';
import * as bcrypt from 'bcryptjs';


@Injectable()
export class UserService {
    constructor(private prisma: PrismaService){}

    async findUser(username:string): Promise<User>{
        const user = await this.prisma.user.findUnique({
            where: {username}
        })
    console.log(user);
    return user;
    }
}
