import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BouquetList } from './bouquetlist.model';
import { BouquetlistService } from './bouquetlist.service';

import { LocalStorageService } from '../local-storage.service';


@Component({
  selector: 'app-bouquet',
  templateUrl: './bouquet.component.html',
  styleUrls: ['./bouquet.component.css']
})
export class BouquetComponent implements OnInit {

  // bouquetList: Array<BouquetList> = [];
  // memorybouquetList: Array<BouquetList> = [];
  // stringArrbouquetList: Array<String> = [];
  myObj: Object;
  query: string = '';
  filterBroadcaster: string = '';
  ChannelCount: number = 0;

  constructor(private router: Router,
    private aService: BouquetlistService,
    private localStorageService: LocalStorageService) { }

  ngOnInit() {
    this.aService.getChannel()
      .subscribe(data => {
        //this.myObj = data;
        //console.log('-->' + JSON.stringify(this.myObj));
        // var keys:Array<Object> = Object.keys(data);
        // //console.log('--> ' + keys);
        //  for (let i = 0; i < keys.length; i++) {
        //      console.log('--> ' + keys[i]);
        //  }

        // for (let i = 0; i < Object.keys(data).length; i++) {
        //   let ob = Object.keys(data)[i];
        //   console.log('i --> ' + ob);
        //   for (let j = 0; j < Object.keys(ob).length; j++) {
        //     console.log('j --> ' + Object.keys(ob)[j]);
        //   }
        // }

      });
  }

  refreshPage(): void {
    this.ngOnInit();
  }

  clearBouquetList(): void {
    //this.localStorageService.clearFreeChannel();
    this.ngOnInit();
  }

  OnMatCardClickEvent(bouquetList: BouquetList, index: number) {

    // if (this.freechannels[freechannel.idFreeChannel - 1].color) {
    //   this.freechannels[freechannel.idFreeChannel - 1].color = false;
    // } else {
    //   this.freechannels[freechannel.idFreeChannel - 1].color = true;
    // }

    //this.localStorageService.setFreeChannel(freechannel, index);
    // console.log('index -->' + index + ' ' + freechannel.idFreeChannel + ' ' + freechannel.Channel + ' ' + freechannel.color);
    this.ChannelCount = this.localStorageService.getFreeChannel().length;


  }

}