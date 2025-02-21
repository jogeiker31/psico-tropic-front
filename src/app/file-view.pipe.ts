import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../environments/environment';

@Pipe({
  name: 'fileView',
  standalone: true,
})
export class FileViewPipe implements PipeTransform {
  private url = environment.api_url;
  transform(value: unknown, ...args: unknown[]): unknown {
    return `${this.url}/files/${value}`;
  }
}
