import { Pipe, PipeTransform } from '@angular/core';

// https://stackblitz.com/edit/angular-custom-pipes-mkah47?file=app%2Fapp.module.ts

@Pipe({ name: 'CustomPayPipe' })
export class CustomPayPipe implements PipeTransform {
  transform(value: any[], term: string, filterHD: string, filterCategory: string,
    filterLang: string, filterBroadcaster: string, filterPrice: number ): any[] {

    let valueArray;

    if (term !== undefined && term.length > 0) {
      valueArray = value.filter((x: any) => x.Broadcaster.toLowerCase().startsWith(term.toLowerCase())
       || x.Channel.toLowerCase().startsWith(term.toLowerCase()));
    } else {
      valueArray = value;
    }

    if (filterHD !== undefined && filterHD.length > 0) {
      valueArray = valueArray.filter((x: any) => x.HD === (filterHD));
    }

    if (filterCategory !== undefined && filterCategory.length > 0) {
      valueArray = valueArray.filter((x: any) => x.category === (filterCategory));
    }

    if (filterLang !== undefined && filterLang.length > 0) {
      valueArray = valueArray.filter((x: any) => x.language === (filterLang));
    }

    // if (filterPrice !== undefined && filterPrice > 0) {
    //   valueArray = valueArray.filter((x: any) => x.price < filterPrice);
    // }

    return valueArray;
  }

}
