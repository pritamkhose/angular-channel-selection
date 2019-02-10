import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PayChannel } from './paychannel.model';
import { PaychannelService } from './paychannel.service';
import { LocalStorageService } from '../local-storage.service';

import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-paychannel',
  templateUrl: './paychannel.component.html',
  styleUrls: ['./paychannel.component.css']
})

export class PaychannelComponent implements OnInit {

  channelLangs: Array<String> = [ 'Assamese', 'Bangla', 'Bhojpuri', 'English', 'English/Hindi', 'Gujarati',
   'Hindi', 'Japanese', 'Kannada', 'Malayalam', 'Marathi', 'Odia', 'Punjabi', 'Tamil', 'Telugu', 'Urdu'];
  channelCats: Array<String> = [ 'Devotional' , 'GEC' , 'Infotainment' , 'Kids' , 'Lifestyle'
    , 'Movies' , 'Music' , 'News' , 'Sports' , 'Miscellaneous'];
  channelBroadcasters: Array<String> = [ ];

  paychannels: Array<PayChannel> = []; // Paychannel[];
  memorypaychannels: Array<PayChannel> = [];
  StringArrPaychannels: Array<String> = [];
  query: String = '';
  filterHD: String = '';
  filterCategory: String = '';
  filterLang: String = '';
  filterBroadcaster: String = '';
  filterPrice: String = '';
  ChannelCount = 0;
  priceChannelUser: String = '';

  constructor(private router: Router,
    private aService: PaychannelService,
    private localStorageService: LocalStorageService) {

  }

  ngOnInit() {
    this.paychannels = [];
    this.StringArrPaychannels = [];
    this.memorypaychannels = this.localStorageService.getPayChannel();
    // this.ChannelCount = this.localStorageService.getPayChannel().length;
    this.calculateBillPage();

    for (let j = 0; j < this.memorypaychannels.length; j++) {
      this.StringArrPaychannels.push(this.memorypaychannels[j].Channel);
    }
    // console.log('this.StringArrPaychannels.length  --> ' + this.StringArrPaychannels.length);

    const data = this.localStorageService.getBackupPayChannel();
    if (data.length === 0) {

      this.aService.getPayChannel()
        .subscribe( ( data: PayChannel[] ) => {
          // this.paychannels = data;

          this.localStorageService.setBackupPayChannel(data);

          for (let i = 0; i < data.length; i++) {
            const v: PayChannel = data[i];
            v.idPayChannel = i + 1;

            if (this.memorypaychannels.length > 0) {
              // console.log('index  --> ' + this.StringArrPaychannels.indexOf(v.Channel));
              if (this.StringArrPaychannels.indexOf(v.Channel) !== -1) {
                v.color = true;
                // console.log('--> ' + v.Channel);
              } else {
                v.color = false;
              }

            } else {
              v.color = false;
            }
            this.paychannels.push(v);
          }
          // console.log('-->' + JSON.Stringify(this.paychannels));
        });
    } else {
      for (let i = 0; i < data.length; i++) {
        const v: PayChannel = data[i];
        v.idPayChannel = i + 1;

        if (this.memorypaychannels.length > 0) {
          // console.log('index  --> ' + this.StringArrPaychannels.indexOf(v.Channel));
          if (this.StringArrPaychannels.indexOf(v.Channel) !== -1) {
            v.color = true;
            // console.log('--> ' + v.Channel);
          } else {
            v.color = false;
          }

        } else {
          v.color = false;
        }
        this.paychannels.push(v);
      }
    }
  }

  refreshFilter(): void {
    this.query = '';
    this.filterHD = '';
    this.filterCategory = '';
    this.filterLang = '';
    this.filterBroadcaster = '';
    this.filterPrice = '';
 }

  refreshPage(): void {
    this.localStorageService.clearBackupPayChannel();
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
    const aListChannel = this.localStorageService.getPayChannel();
    this.ChannelCount = aListChannel.length;

    let price = 0;
    let billCount = 0;
    for (let j = 0; j < aListChannel.length; j++) {
      // console.log('price -->' + aListChannel[j].price);
      price = (price + parseFloat(aListChannel[j].price.toString()));
      if (aListChannel[j].HD === 'HD') {
        billCount = billCount + 2;
      } else {
        billCount = billCount + 1;
      }
    }

    this.priceChannelUser = price + ' ₹ [ ' + billCount + ' ]';
  }


}
