import { Injectable } from '@angular/core';
import { LocalStorage, SharedStorage } from 'ngx-store';

// https://stackblitz.com/edit/ngx-store-localstorage?file=src%2Fapp%2Fapp-storage.service.ts
// https://www.npmjs.com/package/ngx-store

import { FreeChannel } from './freechannel/freechannel.model';
import { PayChannel } from './paychannel/paychannel.model';


@Injectable()
export class LocalStorageService {

  @LocalStorage() freechannels: Array<FreeChannel> = [];
  @LocalStorage() paychannels: Array<PayChannel> = [];
  @LocalStorage() mandatorychannels: Array<FreeChannel> = [];
  //@LocalStorage() user_name: String = null;

  constructor() {
  }

  public clearAll() {
    this.freechannels = [];
    this.paychannels = [];
    this.mandatorychannels = [];
    // this.user_name = null;
  }

  // public getUser() {
  //   return this.user_name;
  // }

  //  public setUser(user: String) {
  //    this.user_name =user;
  // }

  public getFreeChannel() {
    return this.freechannels;
  }

  public setFreeChannel(freeChannel: FreeChannel, indexesgf: number) {
    let b = true;
    for (let i = 0; i < this.freechannels.length; i++) {
      if (freeChannel.idFreeChannel == this.freechannels[i].idFreeChannel) {
        // console.log('delete -->> ' + i + " " + b);

        for (let j = 0; j < this.freechannels.length; j++) {
          if (freeChannel.idFreeChannel == this.freechannels[j].idFreeChannel) {
            this.freechannels.splice(j, 1);
          }
        }

        b = false;
        break;
      } else {
       // console.log('add -->>' + i);
      }
    }
    if (b) {
      freeChannel.color = true;
      this.freechannels.push(freeChannel);
      //console.log('-->>' + JSON.stringify(this.freechannels));
    }

  }

  public clearFreeChannel() {
    this.freechannels = [];
  }


  public getPayChannel() {
    return this.paychannels;
  }

  public setPayChannel(payChannel: PayChannel, indexesgf: number) {
    let b = true;
    for (let i = 0; i < this.paychannels.length; i++) {
      if (payChannel.idPayChannel == this.paychannels[i].idPayChannel) {
       
        for (let j = 0; j < this.paychannels.length; j++) {
          if (payChannel.idPayChannel == this.paychannels[j].idPayChannel) {
            this.paychannels.splice(j, 1);
          }
        }

        b = false;
        break;
      } else {
       // console.log('add -->>' + i);
      }
    }
    if (b) {
      payChannel.color = true;
      this.paychannels.push(payChannel);
      //console.log('-->>' + JSON.stringify(this.payChannels));
    }

  }

  public clearPayChannel() {
    this.paychannels = [];
  }

  public getMandatoryChannel() {
    return this.mandatorychannels;
  }

  public setMandatoryChannel(arrChannels: Array<FreeChannel>) {
      this.mandatorychannels = arrChannels;
  }

  public clearMandatoryChannel() {
    this.mandatorychannels = [];
  }
}