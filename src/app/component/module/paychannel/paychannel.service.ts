import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { PayChannel } from './paychannel.model';

@Injectable()
export class PaychannelService {

  constructor(private http: HttpClient) { }

  private aUrl = 'https://angular-db-fa163.firebaseio.com/TRAIChannel/paychannel';

  public getPayChannel() {
    console.log('get List --> ' + this.aUrl + '.json');
    return this.http.get<PayChannel[]>(this.aUrl + '.json');
  }

}
