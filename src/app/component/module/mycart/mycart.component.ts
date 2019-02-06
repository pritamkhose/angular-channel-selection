import { Component, OnInit } from '@angular/core';

import { FreeChannel } from '../freechannel/freechannel.model';
import { PayChannel } from '../paychannel/paychannel.model';

import { LocalStorageService } from '../local-storage.service';
import { MandatorychannelService } from '../mandatorychannel.service';

@Component({
  selector: 'app-mycart',
  templateUrl: './mycart.component.html',
  styleUrls: ['./mycart.component.css']
})
export class MycartComponent implements OnInit {

  freechannels: Array<FreeChannel> = [];
  paychannels: Array<PayChannel> = [];
  mandatorychannels: Array<FreeChannel> = [];

  channelCount: number = 0;
  freechannelCount: string = "";
  priceChannelUser: string = "";
  hdCount: string = "";
  sdCount: string = "";
  billCount: string = "";
  gstAmt: string = "";
  ncf: number = 0;
  totalPrice: number = 0;
  bouquetPrice: number = 0; 

  constructor(
    private localStorageService: LocalStorageService,
    private mandatorychannelService: MandatorychannelService,
  ) { }

  ngOnInit() {
    this.freechannels = this.localStorageService.getFreeChannel();
    this.paychannels = this.localStorageService.getPayChannel();

    this.mandatorychannels = this.localStorageService.getMandatoryChannel();
    if (this.mandatorychannels.length == 0) {
      this.mandatorychannelService.getChannel()
        .subscribe(data => {
          // console.log('-->' + JSON.stringify(data));
          this.mandatorychannels = data;
          this.localStorageService.setMandatoryChannel(this.mandatorychannels);
          this.calculateBillPage();
        });
    } else {
      this.calculateBillPage();
    }

  }

  refreshPage(): void {
    this.ngOnInit();
  }

  clearAllChannel(): void {
    this.localStorageService.clearAll();
    this.ngOnInit();
  }

  calculateBillPage(): void {

    let manchannel: number = 25;
    let fchannel: number = this.localStorageService.getFreeChannel().length;
    this.freechannelCount = fchannel + ' + ' + manchannel + ' = ' + (fchannel + manchannel);

    let aListChannel: PayChannel[] = this.localStorageService.getPayChannel();
    this.channelCount = aListChannel.length;

    let price = 0;
    let billCount: number = manchannel + fchannel;
    let hdCountNo: number = 0;
    for (let j = 0; j < aListChannel.length; j++) {
      // console.log('price -->' + aListChannel[j].price);
      price = (price + parseFloat(aListChannel[j].price));
      if (aListChannel[j].HD === 'HD') {
        billCount = billCount + 2;
        hdCountNo = hdCountNo + 1;
      } else {
        billCount = billCount + 1;
      }
    }

    let totalBillCount = 0;
    let ncfee = 130;
    if (billCount > 100) {
      let block: number = ((billCount - 100) / 25);
      console.log('block -->' + billCount + ' ' + block + ' ' + parseInt(block));
      if (block > parseInt(block)) {
        block = parseInt(block) + 1;
      }
      // console.log('block -->' + block);
      //price = price + 130 + (block * 20);
      ncfee = ncfee + (block * 20);
    } else {
      totalBillCount = 100;
    }

    this.totalPrice = price;
    price = price + ncfee;

    this.ncf = ncfee;
    this.hdCount = hdCountNo + '';
    this.sdCount = (this.channelCount - hdCountNo) + '';
    this.billCount = billCount + ' / ' + totalBillCount;
    let gst = (price * 0.18);
    this.gstAmt = gst + '';
    this.priceChannelUser = (price + gst) + ' ';
  }
}