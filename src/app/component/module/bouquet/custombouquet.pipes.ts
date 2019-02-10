import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'CustomBouquetPipe' })
export class CustomBouquetPipe implements PipeTransform {
  transform(value: any[], term: string): any[] {

    let valueArray;

    if (term !== undefined && term.length > 0) {
      valueArray = value.filter((x: any) =>
         x.broadcastname.toLowerCase().startsWith(term.toLowerCase()) ||
         x.broadcastArr[0].bouquetname.toLowerCase().startsWith(term.toLowerCase())
      );
    } else {
      valueArray = value;
    }

    return valueArray;
  }

}
