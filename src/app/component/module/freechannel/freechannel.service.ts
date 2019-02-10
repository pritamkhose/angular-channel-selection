import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { FreeChannel } from './freechannel.model';

@Injectable()
export class FreechannelService {

  constructor(private http: HttpClient) { }

  private aUrl = 'https://angular-db-fa163.firebaseio.com/TRAIChannel/freechannel';

  public getFreeChannel() {
    console.log('get List --> ' + this.aUrl + '.json');
    return this.http.get<FreeChannel[]>(this.aUrl + '.json');
  }

}
