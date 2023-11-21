import { ApiProperty } from "@nestjs/swagger"

export class Aluno {
    @ApiProperty({
        type: Number,
        description: 'Id do aluno, autoincremento',
        example: 'auto-increment',
    })
    id: number
    @ApiProperty({
        type: String,
        description: 'RA do aluno',
        example: '201605',
    })
    ra: string
    @ApiProperty({
        type: String,
        description: 'Nome do aluno',
        example: 'João',
    })
    name: string
    @ApiProperty({
        type: String,
        description: 'Senha do aluno',
        example: 'cotil123'
    })
    password: string
}