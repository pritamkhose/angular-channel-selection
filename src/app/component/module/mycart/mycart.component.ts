import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

// https://www.npmjs.com/package/jspdf
import * as jsPDF from 'jspdf';
import { html2canvas } from 'html2canvas';
import { DeviceDetectorService } from 'ngx-device-detector';

import { FreeChannel } from '../freechannel/freechannel.model';
import { PayChannel } from '../paychannel/paychannel.model';
import { BouquetList } from '../bouquet/bouquetlist.model';

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
  bouquetList: Array<BouquetList> = [];
  mandatorychannels: Array<FreeChannel> = [];

  printbtnshow: Boolean = false;

  channelCount: String = '';
  freechannelCount: String = '';
  priceChannelUser: String = '';
  hdCount: String = '';
  sdCount: String = '';
  billCount: String = '';
  gstAmt: String = '';
  ncf = 0;
  channelPrice = 0;
  bouquetPrice = 0;

  @ViewChild('printhtml') d1: ElementRef;

  constructor(
    private elementRef: ElementRef,
    private deviceService: DeviceDetectorService,
    private localStorageService: LocalStorageService,
    private mandatorychannelService: MandatorychannelService,
  ) { }

  ngOnInit() {
    this.freechannels = this.localStorageService.getFreeChannel();
    this.paychannels = this.localStorageService.getPayChannel();
    this.bouquetList = this.localStorageService.getBouquetList();
    this.mandatorychannels = this.localStorageService.getMandatoryChannel();

    if (this.mandatorychannels.length === 0) {
      this.mandatorychannelService.getChannel()
        .subscribe(data => {
          // console.log('-->' + JSON.Stringify(data));
          this.mandatorychannels = data;
          this.localStorageService.setMandatoryChannel(this.mandatorychannels);
          this.calculateBillPage();
        });
    } else {
      this.calculateBillPage();
    }
    this.deviceFunction();
  }

  refreshPage(): void {
    this.ngOnInit();
  }

  clearAllChannel(): void {
    this.localStorageService.clearAll();
    this.ngOnInit();
  }

  calculateBillPage(): void {

    const manchannel = 25;

    // Free Channel
    const fchannel: number = this.localStorageService.getFreeChannel().length;
    this.freechannelCount = fchannel + ' + ' + manchannel + ' = ' + (fchannel + manchannel);

    // Paid Channel
    const aListChannel: PayChannel[] = this.localStorageService.getPayChannel();
    let price = 0;
    let billCount = 0;
    let hdCountNo = 0;
    for (let j = 0; j < aListChannel.length; j++) {
      // console.log('price -->' + aListChannel[j].price);
      price = (price + parseFloat(aListChannel[j].price.toString()));
      if (aListChannel[j].HD === 'HD') {
        billCount = billCount + 2;
        hdCountNo = hdCountNo + 1;
      } else {
        billCount = billCount + 1;
      }
    }
    this.channelPrice = price;

    // BouquetList
    const aListBouquet = this.localStorageService.getBouquetList();
    let priceBouquet = 0;
    let billCountBouquet = 0;
    for (let j = 0; j < aListBouquet.length; j++) {
      priceBouquet = (priceBouquet + parseFloat(aListBouquet[j].price.toString()));
      billCountBouquet = billCountBouquet + aListBouquet[j].channelcount + aListBouquet[j].hdcount;
      hdCountNo = hdCountNo + aListBouquet[j].hdcount;
    }
    this.bouquetPrice = priceBouquet;

    // calculation price
    const paidChannelCount = billCount + billCountBouquet;
    this.channelCount = billCount + ' + ' + billCountBouquet + ' = ' + paidChannelCount;
    billCount = paidChannelCount + fchannel + manchannel;

    let totalBillCount = 100;
    let ncfee = 130;
    if (billCount > 100) {
      let block: number = ((billCount - 100) / 25);
      // console.log('block -->' + billCount + ' ' + block + ' ' + parseInt(block));
      if (block > parseInt(block.toString(), 0)) {
        block = parseInt(block.toString(), 0) + 1;
      }
      ncfee = ncfee + (block * 20);
      totalBillCount = 100 + (block * 25);
    }

    const totalPrice = price + priceBouquet + ncfee;

    this.ncf = ncfee;
    this.hdCount = hdCountNo + '';
    this.sdCount = (billCount - hdCountNo) + '';
    this.billCount = billCount + ' / ' + totalBillCount;
    const gst = (totalPrice * 0.18);
    this.gstAmt = gst.toFixed(2) + '';
    this.priceChannelUser = (totalPrice + gst).toFixed(2) + ' ';
  }

  savePDF(): void {
    const d1 = this.elementRef.nativeElement.querySelector('.printhtml');
    // console.log('savePDF -->' + d1.innerHTML);

    let doc = new jsPDF('p', 'pt', 'letter');
    doc.canvas.height = 72 * 11;
    doc.canvas.width = 72 * 8.5;
    doc.fromHTML(d1, 10, 10);
    // doc.autoPrint();
    doc.save('My Channel Selection.pdf');
  }

  deviceFunction(): void {
    if (this.deviceService.isDesktop()) {
        this.printbtnshow = true;
    }
    // let deviceInfo = this.deviceService.getDeviceInfo();
    // console.log(deviceInfo);
    // console.log(this.deviceService.isMobile());  // returns if the device is a mobile device (android / iPhone / windows-phone etc)
    // console.log(this.deviceService.isTablet());  // returns if the device us a tablet (iPad etc)
    // console.log(this.deviceService.isDesktop()); // returns if the device is a Desktop device
  }

}
