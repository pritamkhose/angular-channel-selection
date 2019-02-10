import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { FreeChannel } from './freechannel/freechannel.model';

@Injectable()
export class MandatorychannelService {

  constructor(private http: HttpClient) { }

  //private aUrl = 'https://channel.trai.gov.in/compulsory.php';
  private aUrl = 'https://angular-db-fa163.firebaseio.com/TRAIChannel/mandatorychannel.json';

  public getChannel() {
    //console.log('get List --> ' + this.aUrl);
    return this.http.get<FreeChannel[]>(this.aUrl);
  }

}
