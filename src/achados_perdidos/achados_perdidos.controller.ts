import { Body, Controller, Get, Post } from '@nestjs/common';
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
}
