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

    async createUser(user: User): Promise<User>{
        const salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash(user.password, salt);
        const newUser = await this.prisma.user.create({
            data: user
        });
        return newUser;
    }
}
