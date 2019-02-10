import { Injectable } from '@angular/core';
import { LocalStorage, SharedStorage } from 'ngx-store';

// https://stackblitz.com/edit/ngx-store-localstorage?file=src%2Fapp%2Fapp-storage.service.ts
// https://www.npmjs.com/package/ngx-store

import { FreeChannel } from './freechannel/freechannel.model';
import { PayChannel } from './paychannel/paychannel.model';
import { BouquetList } from './bouquet/bouquetlist.model';

@Injectable()
export class LocalStorageService {

  @LocalStorage() freechannels: Array<FreeChannel> = [];
  @LocalStorage() BackupFreechannels: Array<FreeChannel> = [];
  @LocalStorage() paychannels: Array<PayChannel> = [];
  @LocalStorage() BackupPaychannels: Array<PayChannel> = [];
  @LocalStorage() mandatorychannels: Array<FreeChannel> = [];
  @LocalStorage() bouquetList: Array<BouquetList> = [];
  @LocalStorage() BackupBouquetList = new Object();
  //@LocalStorage() user_name: String = null;

  constructor() {
  }

  public clearAll() {
    this.freechannels = [];
    this.paychannels = [];
    this.mandatorychannels = [];
    this.bouquetList = [];
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

  public getBouquetList() {
    return this.bouquetList;
  }

  public setBouquetList(objBoquet: BouquetList) {
    let b = true;
    for (let i = 0; i < this.bouquetList.length; i++) {
      if (objBoquet.broadcaster === this.bouquetList[i].broadcaster &&
        objBoquet.bouque === this.bouquetList[i].bouque) {
        this.bouquetList.splice(i, 1);
        b = false;
        break;
      }
    }
    if (b) {
      this.bouquetList.push(objBoquet);
    }

  }

  public clearBouquetList() {
    this.bouquetList = [];
  }

  // Local Backup data
  public getMandatoryChannel() {
    return this.mandatorychannels;
  }

  public setMandatoryChannel(arrChannels: Array<FreeChannel>) {
    this.mandatorychannels = arrChannels;
  }

  public clearMandatoryChannel() {
    this.mandatorychannels = [];
  }

  public getBackupFreeChannel() {
    return this.BackupFreechannels;
  }

  public setBackupFreeChannel(arrChannels: Array<FreeChannel>) {
    this.BackupFreechannels = arrChannels;
  }

  public clearBackupFreeChannel() {
    this.BackupFreechannels = [];
  }

  public getBackupPayChannel() {
    return this.BackupPaychannels;
  }

  public setBackupPayChannel(arrChannels: Array<PayChannel>) {
    this.BackupPaychannels = arrChannels;
  }

  public clearBackupPayChannel() {
    this.BackupPaychannels = [];
  }

  public getBackupBouquetList() {
    return this.BackupBouquetList;
  }

  public setBackupBouquetList(obj: Object) {
    this.BackupBouquetList = obj;
  }

  public clearBackupBouquetList() {
    this.BackupBouquetList = new Object();
  }
  
}