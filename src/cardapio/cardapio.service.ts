import { HttpException, Injectable } from '@nestjs/common';
import { Cardapio } from './model/cardapio';
import { DateService } from './date.service';
import { PrismaService } from 'src/database/prisma.service';
import { format } from 'date-fns';

@Injectable()
export class CardapioService {
  constructor(private prisma: PrismaService, private date: DateService) {}

  async cardapioHoje(): Promise<Cardapio> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const cardapio = await this.prisma.cardapio.findFirst({
      where: {
        data: today,
      },
    });

    if (!cardapio) {
      throw new HttpException('Não há cardápios para hoje',404);
    }

    return cardapio;
  }

  async cardapiosSemana(): Promise<(Cardapio[] | 'feriado' | undefined)[]> {
    const cardapios = await this.prisma.cardapio.findMany({
      where: {
        AND: [
          { data: { gte: this.date.getWeekStart() } },
          { data: { lte: this.date.getWeekEnd() } },
        ],
      },
      orderBy: {
        data: 'asc',
      },
    });

    if (!cardapios.length) {
      throw new HttpException('Não há cardápios nesta semana',404);
    }

    return this.date.addToWeek(cardapios);
  }

  async cardapiosMes(): Promise<(Cardapio[] | 'feriado' | undefined)[]> {
    const cardapios = await this.prisma.cardapio.findMany({
      where: {
        AND: [
          { data: { gte: this.date.getMonthStart() } },
          { data: { lte: this.date.getMonthEnd() } },
        ],
      },
      orderBy: {
        data: 'asc',
      },
    });

    if (!cardapios.length) {
      throw new HttpException('Não há cardápios neste mês',      404
      );
    }

    return this.date.addToMonth(cardapios);
  }

  async cardapiosAno(): Promise<(Cardapio[] | 'feriado' | undefined)[]> {
    const cardapios = await this.prisma.cardapio.findMany({
      where: {
        data: {
          gte: this.date.getYearStart(),
          lte: this.date.getYearEnd(),
        },
      },
      orderBy: {
        data: 'asc',
      },
    });

    if (!cardapios.length) {
      throw new HttpException('Não há cardápios neste ano',
         404,
      );
    }

    return this.date.addToYear(cardapios);
  }

  async bySemana(date: Date): Promise<(Cardapio[] | 'feriado' | undefined)[]> {
    const cardapios = await this.prisma.cardapio.findMany({
      where: {
        AND: [
          {
            data: {
              gte: this.date.getWeekStart(date),
              lte: this.date.getWeekEnd(date),
            },
          },
        ],
      },
      orderBy: {
        data: 'asc',
      },
    });

    if (!cardapios.length) {
      throw new HttpException('Cardápios não encontrados',404);
    }

    return this.date.addToWeek(cardapios);
  }

  async findByWeek(week: number): Promise<(Cardapio[])[]> {

    const cardapios = await this.prisma.cardapio.findMany({
      where: {
        AND: [
          { data: { gte: this.date.getWeekStartByWeek(week) } },
          { data: { lte: this.date.getWeekEndByWeek(week) } },
        ],
      },
      orderBy: {
        data: 'asc',
      },
    });

    if (!cardapios.length) {
      throw new HttpException('Cardápios não encontrados',404 );
    }

    return this.date.toArray(cardapios);
  }
  // async findByWeek(week: number): Promise<(Cardapio[] | 'feriado' | undefined)[]> {

  //   const cardapios = await this.prisma.cardapio.findMany({
  //     where: {
  //       AND: [
  //         { data: { gte: this.date.getWeekStartByWeek(week) } },
  //         { data: { lte: this.date.getWeekEndByWeek(week) } },
  //       ],
  //     },
  //     orderBy: {
  //       data: 'asc',
  //     },
  //   });

  //   if (!cardapios.length) {
  //     throw new HttpException('Cardápios não encontrados',404 );
  //   }

  //   return this.date.addToWeek(cardapios);
  // }

  async findByDate(date: Date): Promise<Cardapio> {
    const cardapio = await this.prisma.cardapio.findFirst({
      where: {
        data: date,
      },
    });

    if (!cardapio) {
      throw new HttpException('Cardápio não encontrado',404);
    }

    return cardapio;
  }

  async findByDay(day: number): Promise<Cardapio> {
    const date = this.date.getFromDay(day);

    const cardapio = await this.prisma.cardapio.findFirst({
      where: {
        data: format(date,"yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"),
      },
    });
    if (!cardapio) {
      throw new HttpException('Cardápio não encontrado',
        404);
    }

    return cardapio;
  }

  async findByMonth(month: number): Promise<(Cardapio[] | 'feriado' | undefined)[]> {
    const cardapios = await this.prisma.cardapio.findMany({
      where: {
        AND: [
          {
            data: {
              gte: this.date.getMonthStartByMonth(month),
              lte: this.date.getMonthEndByMonth(month),
            },
          },
        ],
      },
      orderBy: {
        data: 'asc',
      },
    });

    if (!cardapios.length) {
      throw new HttpException('Cardápios não encontrados', 404);
    }

    return this.date.addToMonth(cardapios);
  }

  async findByYear(year: number): Promise<(Cardapio[] | 'feriado' | undefined)[]> {
    const cardapios = await this.prisma.cardapio.findMany({
      where: {
        data: {
          gte: this.date.getYearStartByYear(year),
          lte: this.date.getYearEndByYear(year),
        },
      },
      orderBy: {
        data: 'asc',
      },
    });

    if (!cardapios.length) {

      throw new HttpException('Cardápios não encontrados',404);
    }

    return this.date.addToYear(cardapios);
  }

  async findByCodigo(codigo: number): Promise<Cardapio> {
    const cardapio = await this.prisma.cardapio.findFirst({
      where: {
        codigo: codigo,
      },
    });

    if (!cardapio) {
      throw new HttpException('Cardápio não encontrado', 404 );
    }

    return cardapio;
  }

  async findAll(): Promise<Cardapio[]> {
    const cardapios = await this.prisma.cardapio.findMany({
      orderBy: {
        data: 'desc',
      },
    });

    if (!cardapios.length) {
      throw new HttpException('Cardápios não encontrados',404);
    }

    return cardapios;
  }

  async create(cardapio: Cardapio): Promise<void> {

    try {
      await this.prisma.cardapio.create({
        data: {
          principal: cardapio.principal,
          guarnicao: cardapio.guarnicao,
          salada: cardapio.salada,
          sobremesa: cardapio.sobremesa,
          suco: cardapio.suco,
          periodo: cardapio.periodo? 1 : 0,
          vegetariano: cardapio.vegetariano? 1 : 0,
          data: cardapio.data,
        },
      });
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new HttpException('Cardápio já cadastrado',409);
      } else {
        throw error;
      }
    }
  }

  async update(cardapio: Cardapio): Promise<void> {


    try {
      await this.prisma.cardapio.update({
        where: {
          codigo: cardapio.codigo,
        },
        data: {
          principal: cardapio.principal,
          guarnicao: cardapio.guarnicao,
          salada: cardapio.salada,
          sobremesa: cardapio.sobremesa,
          suco: cardapio.suco,
          periodo: cardapio.periodo? 1 : 0,
          vegetariano: cardapio.vegetariano? 1 : 0,
          data: cardapio.data,
        },
      });
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new HttpException('Falha!', 409);
      } else {
        throw error;
      }
    }
  }

  async remove(cardapio: Cardapio): Promise<void> {
    try {
      await this.prisma.cardapio.delete({
        where: {
          codigo: cardapio.codigo,
        },
      });
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new HttpException('Falha!', 409);
      } else {
        throw error;
      }
    }
  }
}
