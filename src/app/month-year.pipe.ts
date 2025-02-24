import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'monthYear',
  standalone: true,
})
export class MonthYearPipe implements PipeTransform {
  private meses: string[] = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];

  transform(value: string): string {
    if (!value) return '';

    const [mes, año] = value.split('/').map(Number);

    if (!mes || !año || mes < 1 || mes > 12) return value; // Validar entrada

    return `${this.meses[mes - 1]} de ${año}`;
  }
}
