import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { User } from './model/user';
import * as bcrypt from 'bcryptjs';


@Injectable()
export class UserService {
    constructor(private prisma: PrismaService){}

    async findUser(data:User){
        const user = await this.prisma.user.findUnique({
            where: {username:data.username}
        })
        return user;
    }
}
