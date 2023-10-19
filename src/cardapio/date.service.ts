import { HttpException, Injectable } from '@nestjs/common';
import fetch from 'node-fetch';
import { Cardapio } from './model/cardapio';
import { format, startOfMonth, endOfMonth, startOfYear, endOfYear, startOfWeek, endOfWeek, addDays, isBefore, endOfDay, getYear, getMonth } from 'date-fns';


@Injectable()
export class DateService {
  private map = new Map<number, string[]>();

  async getHolidays(year: number): Promise<string[]> {
    let holidays = this.map.get(year);

    if (!holidays) {
      const response = await fetch(`https://brasilapi.com.br/api/feriados/v1/${year}`);
      const body = await response.json();

      if (response.ok && Array.isArray(body)) {
        holidays = body.map((holiday) => holiday.date);
      } else {
        throw new HttpException('Erro ao buscar feriado',500);
      }

      this.map.set(year, holidays);
    }

    return holidays;
  }

  async isHoliday(date: Date): Promise<boolean> {
    const year = date.getFullYear();
    const [dateStr] = date.toISOString().split('T');

    const holidays = await this.getHolidays(year);
    return holidays.includes(dateStr);
  }

  async getInterval(from: Date, to: Date): Promise<(Cardapio[] | 'feriado' | undefined)[]> {
    const interval = Math.floor((to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    const dates: Array<undefined | 'feriado'> = Array(interval);

    for (let year = from.getFullYear(); year <= to.getFullYear(); year++) {
      const holidays = await this.getHolidays(year);

      holidays.forEach((feriado) => {
        const feriadoDate = new Date(feriado);

        if (feriadoDate >= from && feriadoDate <= to) {
          const day = Math.floor((feriadoDate.getTime() - from.getTime()) / (1000 * 60 * 60 * 24));
          dates[day] = 'feriado';
        }
      });
    }

    return dates;
  }

  async addToInterval(cardapios: Cardapio[], from: Date, to: Date): Promise<(Cardapio[] | 'feriado' | undefined)[]> {
    const dates: Array<Cardapio[] | 'feriado' | undefined> = await this.getInterval(from, to);

    for (const cardapio of cardapios) {
      const day = Math.floor((cardapio.data.getTime() - from.getTime()) / (1000 * 60 * 60 * 24));
      const date = (dates[day] ??= []);
      
      if (date === 'feriado') continue;
      date.push(cardapio);
    }

    return dates;
  }

  toArray(cardapios: Cardapio[]) {
    const dateMap = new Map();
  
    cardapios.forEach((cardapio) => {
      const { data } = cardapio;
       if (dateMap.has(data)) {
        dateMap.get(data).push(cardapio);
      } else {
        dateMap.set(data, [cardapio]);
      }
    });
  
    const array = [...dateMap.values()];
  
    return array;
  }

  async addToYear(cardapios: Cardapio[]): Promise<(Cardapio[] | 'feriado' | undefined)[]> {
    const firstDay = new Date(cardapios[0].data.getFullYear(), 0, 1);
    const lastDay = new Date(firstDay.getFullYear() + 1, 0, 0);

    return this.addToInterval(cardapios, firstDay, lastDay);
  }

  async addToMonth(cardapios: Cardapio[]): Promise<(Cardapio[] | 'feriado' | undefined)[]> {
    const firstDay = new Date(cardapios[0].data.getFullYear(), cardapios[0].data.getMonth(), 1);
    const lastDay = new Date(cardapios[0].data.getFullYear(), cardapios[0].data.getMonth() + 1, 0);

    return this.addToInterval(cardapios, firstDay, lastDay);
  }

  async addToWeek(cardapios: Cardapio[]): Promise<(Cardapio[] | 'feriado' | undefined)[]> {
    const monday = new Date(cardapios[0].data.getFullYear(), cardapios[0].data.getMonth(), cardapios[0].data.getDate() - cardapios[0].data.getDay() + 1);
    const friday = new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + 4);

    return this.addToInterval(cardapios, monday, friday);
  }

  getFromDay(day: number): Date {
    const currentDate = new Date(); // Obtém a data atual
    const currentYear = getYear(currentDate);
    const currentMonth = getMonth(currentDate);
    return new Date(currentYear, currentMonth, day, 0, 0, 0, 0); // Define o início do dia (00:00:00.000).
  }

  getWeekStartByWeek(week: number, year: number = new Date().getFullYear()): Date {
    const date = new Date(year, 0, 1); // Primeiro dia do ano
    date.setDate(date.getDate() + (week - 1) * 7); // Move para a semana desejada
    while (date.getDay() !== 1) {
      date.setDate(date.getDate() - 1); // Encontra o início da semana (segunda-feira)
    }
    return date;
  }

  getWeekEndByWeek(week: number, year: number = new Date().getFullYear()): Date {
    const weekStart = this.getWeekStartByWeek(week, year);
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 6); // Define o final da semana (domingo)
    return weekEnd;
  }

  getMonthStartByMonth(month: number, year: number = new Date().getFullYear()): Date {
    return new Date(year, month - 1, 1); // Mês é base 0, então subtrai 1.
  }

  getMonthEndByMonth(month: number, year: number = new Date().getFullYear()): Date {
    const nextMonth = new Date(year, month, 1); // Próximo mês
    return new Date(nextMonth.getTime() - 1); // Último dia do mês atual.
  }

  getYearStartByYear(year: number = new Date().getFullYear()): Date {
    return new Date(year, 0, 1);
  }

  getYearEndByYear(year: number = new Date().getFullYear()): Date {
    return new Date(year, 11, 31);
  }

  getWeekStart(date: Date = new Date()): Date {
    const startOfWeekDate = startOfWeek(date, { weekStartsOn: 1 }); // Define a segunda-feira como o início da semana.
    return startOfWeekDate;
  }

  getWeekEnd(date: Date = new Date()): Date {
    const weekEnd = endOfWeek(date, { weekStartsOn: 1 }); // Define a segunda-feira como o início da semana.
    return weekEnd;
  }

  getMonthStart(date: Date = new Date()): Date {
    return startOfMonth(date);
  }

  getMonthEnd(date: Date = new Date()): Date {
    return endOfMonth(date);
  }

  getYearStart(date: Date = new Date()): Date {
    return startOfYear(date);
  }

  getYearEnd(date: Date = new Date()): Date {
    return endOfYear(date);
  }
  
  
}
