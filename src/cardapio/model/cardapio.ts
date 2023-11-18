import { ApiProperty } from '@nestjs/swagger';

export class Cardapio {
  @ApiProperty({
    type: Number,
    description: 'Código do cardápio, autoincremento',
    example: 'auto-increment',
  })
  codigo: number;
  @ApiProperty({
    type: String,
    description: 'Item principal do cardápio',
    example: 'Peixe com batata e vagem',
  })
  principal: string;
  @ApiProperty({
    type: String,
    description: 'Guanição do cardápio',
    example: 'Pirão',
  })
  guarnicao: string;
  @ApiProperty({
    type: String,
    description: 'Salada do cardápio',
    example: 'Beterraba ralada',
  })
  salada: string;
  @ApiProperty({
    type: String,
    description: 'Sobremesa do cardápio',
    example: 'Doce de leite',
  })
  sobremesa: string;
  @ApiProperty({
    type: String,
    description: 'Suco do cardápio',
    example: 'Limão',
  })
  suco: string;
  @ApiProperty({
    type: String,
    description: 'Período do cardápio, 0 para almoço e 1 para janta',
    example: 0,
  })
  periodo: number;
  @ApiProperty({
    type: String,
    description: 'Tipo do cardápio, 0 para comum e 1 para vegetariano',
    example: 0,
  })
  vegetariano: number;
  @ApiProperty({
    type: String,
    description: 'Dia relativo ao cardápio a ser cadastrado',
    example: '2023-06-06 00:00:00',
  })
  data: Date;
}
