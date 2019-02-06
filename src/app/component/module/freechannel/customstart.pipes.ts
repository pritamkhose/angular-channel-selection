import { Pipe, PipeTransform } from '@angular/core';

// https://stackblitz.com/edit/angular-custom-pipes-mkah47?file=app%2Fapp.module.ts

@Pipe({ name: 'startsWith' })
export class startsWithPipe implements PipeTransform {
  transform(value: any[], term: string,
    filterBroadcaster: string
  ): any[] {

    var valueArray;

    if (term != undefined && term.length > 0) {
      valueArray = value.filter((x: any) => x.Broadcaster.toLowerCase().startsWith(term.toLowerCase()) || x.Channel.toLowerCase().startsWith(term.toLowerCase()));
    } else {
      valueArray = value;
    }

    if (filterBroadcaster != undefined && filterBroadcaster.length > 0) {
      //console.log('filterBroadcaster -->' + filterBroadcaster);
      valueArray = value.filter((x: any) => x.category.toLowerCase() === (filterBroadcaster.toLowerCase()));
    }
    
    return valueArray;
  }

}