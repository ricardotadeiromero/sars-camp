import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { a_p } from './model/achados_perdidos';

@Injectable()
export class AchadosPerdidosService {
    constructor(private readonly prisma: PrismaService) {}

    async findAll(): Promise<a_p[]> {
        const data = await this.prisma.achadios_perdidos.findMany();
        console.log(data);
        if(data.length){
            return data;
        }
        throw new NotFoundException('Não há itens cadastrados!');       
    }

    async create(data: a_p): Promise<a_p> {
        return await this.prisma.achadios_perdidos.create({
            data: {
                ...data,
                data: new Date(),
            }
        });
    }

    async getById(id: number): Promise<a_p> {
        return await this.prisma.achadios_perdidos.findUniqueOrThrow({
            where: {
                id: id,
            }
        });
    }

    async update(id: number, data: a_p): Promise<a_p> {
        return await this.prisma.achadios_perdidos.update({
            where: {
                id: id,
            },
            data: {
                ...data,
            }
        });
    }
}
