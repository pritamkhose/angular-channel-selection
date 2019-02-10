import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { NgxSpinnerService } from 'ngx-spinner';

import { FreeChannel } from './freechannel.model';
import { FreechannelService } from './freechannel.service';
import { LocalStorageService } from '../local-storage.service';

import { startsWithPipe } from './customstart.pipes';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-freechannel',
  templateUrl: './freechannel.component.html',
  styleUrls: ['./freechannel.component.css']
})
export class FreechannelComponent implements OnInit {

  freechannels: Array<FreeChannel> = []; //FreeChannel[];
  memoryfreechannels: Array<FreeChannel> = [];
  stringArrfreechannels: Array<String> = [];
  query: string = '';
  filterBroadcaster: string = '';
  ChannelCount: number = 0;

  constructor(private router: Router,
    //private spinner: NgxSpinnerService,
    private aService: FreechannelService,
    private localStorageService: LocalStorageService) {

  }

  ngOnInit() {
    this.freechannels = [];
    this.stringArrfreechannels = [];
    this.memoryfreechannels = this.localStorageService.getFreeChannel();
    this.ChannelCount = this.localStorageService.getFreeChannel().length;

    for (let j = 0; j < this.memoryfreechannels.length; j++) {
      this.stringArrfreechannels.push(this.memoryfreechannels[j].Channel)
    }

    //this.spinner.show();

    let data = this.localStorageService.getBackupFreeChannel();
    if (data.length == 0) {
      console.log('WebService --> getFreeChannel');
      this.aService.getFreeChannel()
        .subscribe(data => {
          
          this.localStorageService.setBackupFreeChannel(data);
          //this.spinner.hide();

          for (let i = 0; i < data.length; i++) {
            let v: FreeChannel = data[i];
            v.idFreeChannel = i + 1;

            if (this.memoryfreechannels.length > 0) {
              //console.log('index  --> ' + this.stringArrfreechannels.indexOf(v.Channel));
              if (this.stringArrfreechannels.indexOf(v.Channel) != -1) {
                v.color = true;
                //console.log('--> ' + v.Channel);
              } else {
                v.color = false;
              }

            } else {
              v.color = false;
            }
            this.freechannels.push(v);
          }

        });
    } else {
       
      for (let i = 0; i < data.length; i++) {
        let v: FreeChannel = data[i];
        v.idFreeChannel = i + 1;

        if (this.memoryfreechannels.length > 0) {
          //console.log('index  --> ' + this.stringArrfreechannels.indexOf(v.Channel));
          if (this.stringArrfreechannels.indexOf(v.Channel) != -1) {
            v.color = true;
            //console.log('--> ' + v.Channel);
          } else {
            v.color = false;
          }

        } else {
          v.color = false;
        }
        this.freechannels.push(v);
      }
    }

    // console.log('-->' + JSON.stringify(this.freechannels));
  }

  refreshPage(): void {
    this.localStorageService.clearBackupFreeChannel();
    this.ngOnInit();
  }

  ClearFreeChannel(): void {
    this.localStorageService.clearFreeChannel();
    this.ngOnInit();
  }

  OnMatCardClickEvent(freechannel: FreeChannel, index: number) {

    if (this.freechannels[freechannel.idFreeChannel - 1].color) {
      this.freechannels[freechannel.idFreeChannel - 1].color = false;
    } else {
      this.freechannels[freechannel.idFreeChannel - 1].color = true;
    }

    this.localStorageService.setFreeChannel(freechannel, index);
    // console.log('index -->' + index + ' ' + freechannel.idFreeChannel + ' ' + freechannel.Channel + ' ' + freechannel.color);
    this.ChannelCount = this.localStorageService.getFreeChannel().length;


  }

}