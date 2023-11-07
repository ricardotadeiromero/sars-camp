import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { AchadosPerdidosService } from './achados_perdidos.service';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { a_p } from './model/achados_perdidos';

@Controller('achados-perdidos')
export class AchadosPerdidosController {
  constructor(private readonly achadosPerdidosService: AchadosPerdidosService) {}

  @IsPublic()
  @Get()
  async findAll() {
    return await this.achadosPerdidosService.findAll();
  } 

  @Post()
  async create(@Body() data: a_p) {
    return await this.achadosPerdidosService.create(data);
  }

  @Get('/:id')
  async getById(@Param('id') id: number) {
    return await this.achadosPerdidosService.getById(id);
  }

  @Put()
  async update(@Body() data: a_p) {
    return await this.achadosPerdidosService.update(data.id, data);
  }
}
