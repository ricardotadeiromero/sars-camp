import { Controller, Get, Post, Put, Delete, Param, Body, Session, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { CardapioService } from './cardapio.service';
import { Cardapio } from './model/cardapio';
import { JwtAuthGuard } from 'src/auth/guards/user/jwt-auth.guard';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';


@Controller('cardapio')
export class CardapioController {
  constructor(private cardapioService: CardapioService) {}

  @Get('hoje')
  async getCardapioHoje(): Promise<Cardapio> {
    return await this.cardapioService.cardapioHoje();
  }

  @IsPublic()
  @Get('semana')
  async getCardapiosSemana(): Promise<(Cardapio[] | 'feriado' | undefined)[]> {
    return await this.cardapioService.cardapiosSemana();
  }

  @Get('mes')
  async getCardapiosMes(): Promise<(Cardapio[] | 'feriado' | undefined)[]> {
    return await this.cardapioService.cardapiosMes();
  }

  @Get('ano')
  async getCardapiosAno(): Promise<(Cardapio[] | 'feriado' | undefined)[]> {
    return await this.cardapioService.cardapiosAno();
  }

  @Get('semana/data/:date')
  async getCardapiosBySemana(@Param('date') date: Date): Promise<(Cardapio[] | 'feriado' | undefined)[]> {
    return await this.cardapioService.bySemana(new Date(date));
  }

  @IsPublic()
  @Get('semana/:week')
  async getCardapiosByWeek(@Param('week') week: number): Promise<(Cardapio[])[]> {
    return await this.cardapioService.findByWeek(week);
  }

  @Get('date/:date')
  async getCardapioByDate(@Param('date') date: Date): Promise<Cardapio> {
    return await this.cardapioService.findByDate(new Date(date));
  }

  @Get('dia/:day')
  async getCardapioByDay(@Param('day') day: number): Promise<Cardapio> {
    return await this.cardapioService.findByDay(day);
  }

  @Get('mes/:month')
  async getCardapiosByMonth(@Param('month') month: number): Promise<(Cardapio[] | 'feriado' | undefined)[]> {
    return await this.cardapioService.findByMonth(month);
  }

  @Get('ano/:year')
  async getCardapiosByYear(@Param('year') year: number): Promise<(Cardapio[] | 'feriado' | undefined)[]> {
    return await this.cardapioService.findByYear(year);
  }

  @Get(':codigo')
  async getCardapioByCodigo(@Param('codigo') codigo: number): Promise<Cardapio> {
    return await this.cardapioService.findByCodigo(codigo);
  }

  @Get()
  async getAllCardapios(): Promise<Cardapio[]> {
    return await this.cardapioService.findAll();
  }


  @Post()
  async createCardapio(@Body() cardapio: Cardapio): Promise<void> {

    return await this.cardapioService.create(cardapio);
  }


  @Put()
  async updateCardapio(@Body() cardapio: Cardapio): Promise<void> {
    return await this.cardapioService.update(cardapio);
  }


  @Delete()
  async deleteCardapio(@Body() cardapio: Cardapio): Promise<void> {
    return await this.cardapioService.remove(cardapio);
  }
}
