import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AchadosPerdidosService } from './achados_perdidos.service';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { a_p } from './model/achados_perdidos';

@Controller('achados-perdidos')
export class AchadosPerdidosController {
  constructor(
    private readonly achadosPerdidosService: AchadosPerdidosService,
  ) {}

  @IsPublic()
  @Get()
  async findAll() {
    return await this.achadosPerdidosService.findAll();
  }

  @Post()
  async create(@Body() data: a_p) {
    return await this.achadosPerdidosService.create(data);
  }

  @Put()
  async update(@Body() data: a_p) {
    return await this.achadosPerdidosService.update(data.id, data);
  }

  @Delete(':id') // Defina o parâmetro 'id' na rota
  async delete(@Param('id') id: number) {
    console.log(id);
    return await this.achadosPerdidosService.delete(id);
  }
}
