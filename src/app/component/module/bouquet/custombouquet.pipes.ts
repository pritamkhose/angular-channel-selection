import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'CustomBouquetPipe' })
export class CustomBouquetPipe implements PipeTransform {
  transform(value: any[], term: string, filterBroadcaster: string): any[] {

    var valueArray;

    if (term != undefined && term.length > 0) {
      valueArray = value.filter((x: any) => x.Broadcaster.toLowerCase().startsWith(term.toLowerCase()) || x.Channel.toLowerCase().startsWith(term.toLowerCase()));
    } else {
      valueArray = value;
    }

    if (filterBroadcaster != undefined && filterBroadcaster.length > 0) {
      //console.log('filterBroadcaster -->' + filterBroadcaster);
      valueArray = value.filter((x: any) => x.HD.toLowerCase() === (filterBroadcaster.toLowerCase()));
    }

    return valueArray;
  }

}