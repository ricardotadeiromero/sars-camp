import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class AlunoService {
    constructor(private readonly prisma: PrismaService){}

    async findAluno(ra: string){
        const aluno = await this.prisma.aluno.findUnique({
            where: {ra}
        })
        if(!aluno){
            throw new NotFoundException('Aluno não encontrado!');
        }
        return aluno;
    }
}
