import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BouquetList } from './bouquetlist.model';
import { BouquetlistService } from './bouquetlist.service';

import { LocalStorageService } from '../local-storage.service';
import { CustomBouquetPipe } from './custombouquet.pipes';

@Component({
  selector: 'app-bouquet',
  templateUrl: './bouquet.component.html',
  styleUrls: ['./bouquet.component.css']
})
export class BouquetComponent implements OnInit {

  memorybouquetList: Array<BouquetList> = [];
  BroadcasterList = [];
  //channelNameArr = [];

  query: string = '';
  filterBroadcaster: string = '';
  priceChannelUser: string = '0';

  constructor(private router: Router,
    private aService: BouquetlistService,
    private localStorageService: LocalStorageService) { }

  ngOnInit() {
    let data = this.localStorageService.getBackupBouquetList();
    console.log('WebService --> getChannel' + JSON.stringify(data));
    if (Object.keys(data).length === 0) {
      this.aService.getChannel()
        .subscribe(data => {
          this.localStorageService.setBackupBouquetList(data);
          this.callWebService(data);
        });
    } else {
      this.callWebService(data);
    }

  }

  callWebService(data: Object): void {

    this.BroadcasterList = [];
    //this.channelNameArr = [];
    let aListChannel = this.localStorageService.getBouquetList();

    for (let i = 0; i < Object.keys(data).length; i++) {

      let BroadcastArr = [];
      //console.log('i --> ' + Object.keys(data)[i] + '\n'+ JSON.stringify(data[Object.keys(data)[i]]));

      let obj = data[Object.keys(data)[i]];
      for (let j = 0; j < Object.keys(obj).length; j++) {
        //console.log('j --> ' + Object.keys(obj)[j] + '\n'+ JSON.stringify(obj[Object.keys(obj)[j]]));
        let cobj = obj[Object.keys(obj)[j]];
        //console.log('cobj --> ' + Object.keys(obj)[j] + cobj["Bouquetprice"][0]["bouquetprice"]);

        let channelsArr = [];
        let channels = cobj["Channels"];
        for (let k = 0; k < channels.length; k++) {
          //console.log('cobj channel--> ' + channels[k]["Channel"]);
          let channelObj = {
            index: (k + 1),
            channel: channels[k]["Channel"],
            price: channels[k]["price"],
          };
          channelsArr.push(channelObj);
        }

        let isBuy: boolean = false;
        for (let m = 0; m < aListChannel.length; m++) {
          if (Object.keys(obj)[j] === aListChannel[m].bouque &&
            Object.keys(data)[i] === aListChannel[m].broadcaster) {
            isBuy = true;
            break;
          }
          // console.log('channel--> '+ aListChannel[m].bouque + ' '+ aListChannel[m].broadcaster);
          // console.log('cobj channel--> '+ isBuy + ' ' + Object.keys(obj)[j] + ' '+ Object.keys(data)[i]);
        }

        let packObj = {
          index: (j + 1),
          bouquetname: Object.keys(obj)[j],
          bouquetprice: cobj["Bouquetprice"][0]["bouquetprice"],
          channelsCount: channelsArr.length,
          show: false,
          channelsArr: channelsArr,
          buy: isBuy
        };
        //this.channelNameArr.push(Object.keys(obj)[j]);
        BroadcastArr.push(packObj);
      }

      let broadcasterObj = {
        index: (i + 1),
        broadcastname: Object.keys(data)[i],
        broadcastArr: BroadcastArr
      };
      this.BroadcasterList.push(broadcasterObj);
    }
    this.calculation();
    // console.log('--> ' + JSON.stringify(this.BroadcasterList))
  }

  getVisibility(obj: Object, no: number, index: number): void {
    //console.log(b["show"] + ' --> ' + JSON.stringify(this.BroadcasterList[no]["broadcastArr"][index]["show"]));
    this.BroadcasterList[no]["broadcastArr"][index]["show"] = !(obj["show"]);
  }

  getBuy(obj: Object, no: number, index: number): void {
    this.BroadcasterList[no]["broadcastArr"][index]["buy"] = !(obj["buy"]);

    let myObj = new BouquetList();;
    myObj.broadcaster = this.BroadcasterList[no]["broadcastname"] + '';
    myObj.bouque = obj["bouquetname"] + '';
    myObj.channelcount = obj["channelsCount"];
    let hdno = 0;
    for (let k = 0; k < obj["channelsArr"].length; k++) {
      let s = obj["channelsArr"][k]["channel"] + '';
      if (s.toLowerCase().includes("hd")) {
        hdno = hdno + 1;
      }
    }
    myObj.hdcount = hdno;
    myObj.price = obj["bouquetprice"];

    //console.log('obj  --> ' + JSON.stringify(obj) + '\n-->' + JSON.stringify(myObj));
    this.localStorageService.setBouquetList(myObj);

    this.calculation();
  }

  calculation(): void {

    let aListChannel = this.localStorageService.getBouquetList();
    let price = 0;
    let billCount = 0;
    for (let j = 0; j < aListChannel.length; j++) {
      price = (price + parseFloat(aListChannel[j].price));
      billCount = billCount + aListChannel[j].channelcount + aListChannel[j].hdcount;
    }
    this.priceChannelUser = price + ' ₹ [ ' + billCount + ' ]';
  }

  refreshPage(): void {
    this.BroadcasterList = [];
    this.localStorageService.clearBackupBouquetList();
    this.ngOnInit();
  }

  clearBouquetList(): void {
    this.localStorageService.clearBouquetList();
    this.ngOnInit();
  }


}