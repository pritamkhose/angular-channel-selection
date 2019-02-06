import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PayChannel } from './paychannel.model';
import { PaychannelService } from './paychannel.service';
import { LocalStorageService } from '../local-storage.service';

import { CustomPayPipe } from './custompay.pipes';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-paychannel',
  templateUrl: './paychannel.component.html',
  styleUrls: ['./paychannel.component.css']
})
export class PaychannelComponent implements OnInit {

  paychannels: Array<PayChannel> = []; //Paychannel[];
  memorypaychannels: Array<PayChannel> = [];
  stringArrPaychannels: Array<String> = [];
  query: string = '';
  filterBroadcaster: string = '';
  ChannelCount: number = 0;
  priceChannelUser: string = "";

  constructor(private router: Router,
    private aService: PaychannelService,
    private localStorageService: LocalStorageService) {

  }

  ngOnInit() {
    this.paychannels = [];
    this.stringArrPaychannels = [];
    this.memorypaychannels = this.localStorageService.getPayChannel();
    //this.ChannelCount = this.localStorageService.getPayChannel().length;
    this.calculateBillPage();

    for (let j = 0; j < this.memorypaychannels.length; j++) {
      this.stringArrPaychannels.push(this.memorypaychannels[j].Channel)
    }
    // console.log('this.stringArrPaychannels.length  --> ' + this.stringArrPaychannels.length);

    this.aService.getPayChannel()
      .subscribe(data => {
        //this.paychannels = data;
        for (let i = 0; i < data.length; i++) {
          let v: PayChannel = data[i];
          v.idPayChannel = i + 1;

          if (this.memorypaychannels.length > 0) {
            //console.log('index  --> ' + this.stringArrPaychannels.indexOf(v.Channel));
            if (this.stringArrPaychannels.indexOf(v.Channel) != -1) {
              v.color = true;
              //console.log('--> ' + v.Channel);
            } else {
              v.color = false;
            }

          } else {
            v.color = false;
          }
          this.paychannels.push(v);
        }
        // console.log('-->' + JSON.stringify(this.paychannels));
      });
  }

  refreshPage(): void {
    this.ngOnInit();
  }

  Clearpaychannel(): void {
    this.localStorageService.clearPayChannel();
    this.ngOnInit();
  }

  OnMatCardClickEvent(paychannel: PayChannel, index: number) {

    if (this.paychannels[paychannel.idPayChannel - 1].color) {
      this.paychannels[paychannel.idPayChannel - 1].color = false;
    } else {
      this.paychannels[paychannel.idPayChannel - 1].color = true;
    }

    this.localStorageService.setPayChannel(paychannel, index);
    // console.log('index -->' + index + ' ' + paychannel.idPaychannel + ' ' + paychannel.Channel + ' ' + paychannel.color);
    this.calculateBillPage();
  }

  calculateBillPage(): void {
    let aListChannel = this.localStorageService.getPayChannel();
    this.ChannelCount = aListChannel.length;

    let price = 0;
    let billCount: number = this.localStorageService.getFreeChannel().length;
    for (let j = 0; j < aListChannel.length; j++) {
      // console.log('price -->' + aListChannel[j].price);
      price = (price + parseFloat(aListChannel[j].price));
      if (aListChannel[j].HD === 'HD') {
        billCount = billCount + 2;
      } else {
        billCount = billCount + 1;
      }
    }

    this.priceChannelUser = price + ' ₹ [ ' + billCount + ' ]';
  }


}