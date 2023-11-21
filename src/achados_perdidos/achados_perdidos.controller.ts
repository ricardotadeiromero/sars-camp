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
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('achados_perdidos')
@Controller('achados-perdidos')
export class AchadosPerdidosController {
  constructor(
    private readonly achadosPerdidosService: AchadosPerdidosService,
  ) {}

  @IsPublic()
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  @ApiOperation({
    summary: 'Busca todos os itens, rota pública para todos acessarem',
  })
  @ApiNotFoundResponse({
    description: 'Itens não encontrados',
  })
  @ApiOkResponse({
    description: 'Sucesso!',
  })
  @Get()
  async findAll() {
    return await this.achadosPerdidosService.findAll();
  }

  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  @ApiOperation({
    summary:
      'Cria um cardápio, porém apenas usuários autenticados podem acessar essa rota',
  })
  @ApiConflictResponse({
    description: 'Falha!',
  })
  @ApiCreatedResponse({
    description: 'Sucesso!',
  })
  @Post()
  async create(@Body() data: a_p) {
    return await this.achadosPerdidosService.create(data);
  }

  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  @ApiOperation({
    summary:
      'Busca um item pelo código, porém apenas usuários autenticados podem acessar essa rota',
  })
  @ApiNotFoundResponse({
    description: 'Item não encontrado!',
  })
  @ApiOkResponse({
    description: 'Sucesso!',
  })
  @Get('/:id')
  async getById(@Param('id') id: number) {
    return await this.achadosPerdidosService.getById(id);
  }

  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  @ApiOperation({
    summary:
      'Atualiza um item, porém apenas usuários autenticados podem acessar essa rota',
  })
  @ApiNotFoundResponse({
    description: 'Item não encontrado!',
  })
  @ApiOkResponse({
    description: 'Sucesso!',
  })
  @Put()
  async update(@Body() data: a_p) {
    return await this.achadosPerdidosService.update(data.id, data);
  }

  @ApiNotFoundResponse({
    description: 'Item não encontrado!',
  })
  @ApiOkResponse({
    description: 'Sucesso!',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  @ApiOperation({
    summary:
      'Deleta um item, porém apenas usuários autenticados podem acessar essa rota',
  })
  @Delete('/:id')
  async delete(@Param('id') id: number) {
    return await this.achadosPerdidosService.delete(id);
  }
}
