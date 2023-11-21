import { ApiProperty } from "@nestjs/swagger"

export class User {
    @ApiProperty({
        type: Number,
        description: 'Id do usuário, autoincremento',
        example: 'auto-increment',
    })
    id: number
    @ApiProperty({
        type: String,
        description: 'Nome do usuário',
        example: 'João',
    })
    username: string
    @ApiProperty({
        type: String,
        description: 'Senha do usuário',
        example: 'cotil123'
    })
    password: string
}