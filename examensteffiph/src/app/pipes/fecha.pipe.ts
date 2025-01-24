import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fecha'
})
export class FechaPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    const date = new Date(value);
    return date.toLocaleDateString('es-ES');  
  }

}
