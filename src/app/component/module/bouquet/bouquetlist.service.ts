import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { BouquetList } from './bouquetlist.model';

@Injectable()
export class BouquetlistService {

   constructor(private http: HttpClient) { }

  private aUrl = 'https://angular-db-fa163.firebaseio.com/TRAIChannel/bouquetlistTest.json';

  public getChannel() {
    console.log('get List --> ' + this.aUrl);
    return this.http.get(this.aUrl + '');
  }

}
