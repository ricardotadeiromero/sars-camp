import { ApiProperty } from '@nestjs/swagger';

export class a_p {
  @ApiProperty({
    description: 'Id do objeto, autoincremento',
    type: Number,
    example: 'auto-increment',
  })
  id?: number;
  @ApiProperty({
    description: 'Nome do objeto perdido',
    type: String,
    example: 'Celular',
  })
  material: string;
  @ApiProperty({
    description: 'Local onde o objeto foi encontrado',
    type: String,
    example: 'Sala 101',
  })
  local: string;
  @ApiProperty({
    description: 'Campus onde o objeto foi encontrado',
    type: Number,
    example: 1,
  })
  campus: number;
  @ApiProperty({
    description:
      'Data em que o objeto foi encontrado, data é incrementeada automaticamente',
    type: Date,
    example: 'auto-increment',
  })
  data?: Date;
}
