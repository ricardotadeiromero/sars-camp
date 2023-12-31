import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class SaldoService {
    constructor(private readonly prisma: PrismaService){}

    async findSaldo(id: number){
        const saldo = await this.prisma.saldo.findUnique({
            where: {id}
        })
        if(!saldo){
            throw new BadRequestException('Saldo não encontrado');
        }
        return saldo.saldo;
    }
}
