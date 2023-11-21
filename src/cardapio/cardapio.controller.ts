import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Session,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { CardapioService } from './cardapio.service';
import { Cardapio } from './model/cardapio';
import { JwtAuthGuard } from 'src/auth/guards/user/jwt-auth.guard';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import {
  ApiNotFoundResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiProperty,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('cardapio')
@Controller('cardapio')
export class CardapioController {
  constructor(private cardapioService: CardapioService) {}

  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  @ApiOperation({
    summary:
      'Busca todos os cardápios do dia atual, porém apenas usuários autenticados podem acessar essa rota',
  })
  @ApiNotFoundResponse({
    description: 'Cardápios não encontrados',
  })
  @ApiOkResponse({
    description: 'Sucesso!',
  })
  @Get('hoje')
  async getCardapioHoje(): Promise<Cardapio> {
    return await this.cardapioService.cardapioHoje();
  }
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  @ApiOperation({
    summary:
      'Busca todos os cardápios da semana, rota pública para todos acessarem',
  })
  @ApiNotFoundResponse({
    description: 'Cardápios não encontrados',
  })
  @ApiOkResponse({
    description: 'Sucesso!',
  })
  @IsPublic()
  @Get('semana')
  async getCardapiosSemana(): Promise<(Cardapio[] | 'feriado' | undefined)[]> {
    return await this.cardapioService.cardapiosSemana();
  }
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  @ApiOperation({
    summary:
      'Busca todos os cardápios do mês, porém apenas usuários autenticados podem acessar essa rota',
  })
  @ApiNotFoundResponse({
    description: 'Cardápios não encontrados',
  })
  @ApiOkResponse({
    description: 'Sucesso!',
  })
  @Get('mes')
  async getCardapiosMes(): Promise<(Cardapio[] | 'feriado' | undefined)[]> {
    return await this.cardapioService.cardapiosMes();
  }

  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  @ApiOperation({
    summary:
      'Busca todos os cardápios do ano, porém apenas usuários autenticados podem acessar essa rota',
  })
  @ApiNotFoundResponse({
    description: 'Cardápios não encontrados',
  })
  @ApiOkResponse({
    description: 'Sucesso!',
  })
  @Get('ano')
  async getCardapiosAno(): Promise<(Cardapio[] | 'feriado' | undefined)[]> {
    return await this.cardapioService.cardapiosAno();
  }
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  @ApiOperation({
    summary:
      'Busca todos os cardápios da semana da data referente, porém apenas usuários autenticados podem acessar essa rota',
  })
  @ApiNotFoundResponse({
    description: 'Cardápios não encontrados',
  })
  @ApiOkResponse({
    description: 'Sucesso!',
  })
  @Get('semana/data/:date')
  async getCardapiosBySemana(
    @Param('date') date: Date,
  ): Promise<(Cardapio[] | 'feriado' | undefined)[]> {
    return await this.cardapioService.bySemana(new Date(date));
  }

  @ApiOperation({
    summary:
      'Busca todos os cardápios da semana referente, rota pública para todos acessarem',
  })
  @ApiNotFoundResponse({
    description: 'Cardápios não encontrados',
  })
  @ApiOkResponse({
    description: 'Sucesso!',
  })
  @IsPublic()
  @Get('semana/:week')
  async getCardapiosByWeek(@Param('week') week: number): Promise<Cardapio[][]> {
    return await this.cardapioService.findByWeek(week);
  }

  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  @ApiOperation({
    summary:
      'Busca todos os cardápios da data referente, porém apenas usuários autenticados podem acessar essa rota',
  })
  @ApiNotFoundResponse({
    description: 'Cardápios não encontrados',
  })
  @ApiOkResponse({
    description: 'Sucesso!',
  })
  @Get('date/:date')
  async getCardapioByDate(@Param('date') date: Date): Promise<Cardapio> {
    return await this.cardapioService.findByDate(new Date(date));
  }

  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  @ApiOperation({
    summary:
      'Busca todos os cardápios do dia referente ao mês atual, porém apenas usuários autenticados podem acessar essa rota',
  })
  @ApiNotFoundResponse({
    description: 'Cardápios não encontrados',
  })
  @ApiOkResponse({
    description: 'Sucesso!',
  })
  @Get('dia/:day')
  async getCardapioByDay(@Param('day') day: number): Promise<Cardapio> {
    return await this.cardapioService.findByDay(day);
  }

  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  @ApiOperation({
    summary:
      'Busca todos os cardápios do mês referente, porém apenas usuários autenticados podem acessar essa rota',
  })
  @ApiNotFoundResponse({
    description: 'Cardápios não encontrados',
  })
  @ApiOkResponse({
    description: 'Sucesso!',
  })
  @Get('mes/:month')
  async getCardapiosByMonth(
    @Param('month') month: number,
  ): Promise<(Cardapio[] | 'feriado' | undefined)[]> {
    return await this.cardapioService.findByMonth(month);
  }

  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  @ApiOperation({
    summary:
      'Busca todos os cardápios do ano referente, porém apenas usuários autenticados podem acessar essa rota',
  })
  @ApiNotFoundResponse({
    description: 'Cardápios não encontrados',
  })
  @ApiOkResponse({
    description: 'Sucesso!',
  })
  @Get('ano/:year')
  async getCardapiosByYear(
    @Param('year') year: number,
  ): Promise<(Cardapio[] | 'feriado' | undefined)[]> {
    return await this.cardapioService.findByYear(year);
  }

  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  @ApiOperation({
    summary:
      'Busca um cardápio pelo código, porém apenas usuários autenticados podem acessar essa rota',
  })
  @ApiNotFoundResponse({
    description: 'Cardápios não encontrados',
  })
  @ApiOkResponse({
    description: 'Sucesso!',
  })
  @Get(':codigo')
  async getCardapioByCodigo(
    @Param('codigo') codigo: number,
  ): Promise<Cardapio> {
    return await this.cardapioService.findByCodigo(codigo);
  }

  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  @ApiOperation({
    summary:
      'Busca todos os cardápios, porém apenas usuários autenticados podem acessar essa rota',
  })
  @ApiNotFoundResponse({
    description: 'Cardápios não encontrados',
  })
  @ApiOkResponse({
    description: 'Sucesso!',
  })
  @Get()
  async getAllCardapios(): Promise<Cardapio[]> {
    return await this.cardapioService.findAll();
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
  async createCardapio(@Body() cardapio: Cardapio): Promise<void> {
    return await this.cardapioService.create(cardapio);
  }

  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  @ApiOperation({
    summary:
      'Atualiza um cardápio, porém apenas usuários autenticados podem acessar essa rota',
  })
  @ApiNotFoundResponse({
    description: 'Cardápio não encontrado!',
  })
  @ApiOkResponse({
    description: 'Sucesso!',
  })
  @Put()
  async updateCardapio(@Body() cardapio: Cardapio): Promise<void> {
    return await this.cardapioService.update(cardapio);
  }

  @ApiNotFoundResponse({
    description: 'Cardápio não encontrado!',
  })
  @ApiOkResponse({
    description: 'Sucesso!',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  @ApiOperation({
    summary:
      'Deleta um cardápio, porém apenas usuários autenticados podem acessar essa rota',
  })
  @Delete()
  async deleteCardapio(@Body() cardapio: Cardapio): Promise<void> {
    return await this.cardapioService.remove(cardapio);
  }
}
