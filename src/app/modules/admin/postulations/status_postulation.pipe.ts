import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'status_postulation',
})
export class Status_postulationPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    switch (value) {
      case 'ACCEPTED':
        return 'ACEPTADA';
        break;
      case 'DECLINE':
        return 'RECHAZADA';
        break;

      default:
        return 'PENDIENTE';
        break;
    }
    return null;
  }
}
