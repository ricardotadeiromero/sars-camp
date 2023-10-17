import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { CardapioService } from './cardapio.service';
import { Cardapio } from './model/cardapio';

@Controller('cardapio')
export class CardapioController {
  constructor(private cardapioService: CardapioService) {}

  @Get('hoje')
  async getCardapioHoje(): Promise<Cardapio> {
    return this.cardapioService.cardapioHoje();
  }

  @Get('semana')
  async getCardapiosSemana(): Promise<(Cardapio[] | 'feriado' | undefined)[]> {
    return this.cardapioService.cardapiosSemana();
  }

  @Get('mes')
  async getCardapiosMes(): Promise<(Cardapio[] | 'feriado' | undefined)[]> {
    return this.cardapioService.cardapiosMes();
  }

  @Get('ano')
  async getCardapiosAno(): Promise<(Cardapio[] | 'feriado' | undefined)[]> {
    return this.cardapioService.cardapiosAno();
  }

  @Get('semana/data/:date')
  async getCardapiosBySemana(@Param('date') date: Date): Promise<(Cardapio[] | 'feriado' | undefined)[]> {
    return this.cardapioService.bySemana(new Date(date));
  }

  @Get('semana/:week')
  async getCardapiosByWeek(@Param('week') week: number): Promise<(Cardapio[] | 'feriado' | undefined)[]> {
    return this.cardapioService.findByWeek(week);
  }

  @Get('date/:date')
  async getCardapioByDate(@Param('date') date: Date): Promise<Cardapio> {
    return this.cardapioService.findByDate(new Date(date));
  }

  @Get('dia/:day')
  async getCardapioByDay(@Param('day') day: number): Promise<Cardapio> {
    return this.cardapioService.findByDay(day);
  }

  @Get('mes/:month')
  async getCardapiosByMonth(@Param('month') month: number): Promise<(Cardapio[] | 'feriado' | undefined)[]> {
    return this.cardapioService.findByMonth(month);
  }

  @Get('ano/:year')
  async getCardapiosByYear(@Param('year') year: number): Promise<(Cardapio[] | 'feriado' | undefined)[]> {
    return this.cardapioService.findByYear(year);
  }

  @Get(':codigo')
  async getCardapioByCodigo(@Param('codigo') codigo: number): Promise<Cardapio> {
    return this.cardapioService.findByCodigo(codigo);
  }

  @Get()
  async getAllCardapios(): Promise<Cardapio[]> {
    return this.cardapioService.findAll();
  }

  @Post()
  async createCardapio(@Body() cardapio: Cardapio): Promise<void> {
    return this.cardapioService.create(cardapio);
  }

  @Put()
  async updateCardapio(@Body() cardapio: Cardapio): Promise<void> {
    return this.cardapioService.update(cardapio);
  }

  @Delete(':codigo')
  async deleteCardapio(@Param('codigo') codigo: number): Promise<void> {
    const cardapio = await this.cardapioService.findByCodigo(codigo);
    return this.cardapioService.remove(cardapio);
  }
}
