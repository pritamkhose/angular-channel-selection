import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material';
import { HttpClientModule } from "@angular/common/http";
import { WebStorageModule } from 'ngx-store';
// https://www.npmjs.com/package/ngx-print
import { NgxPrintModule } from 'ngx-print';
// https://www.npmjs.com/package/ngx-spinner
import { NgxSpinnerModule } from 'ngx-spinner';
// https://www.npmjs.com/package/ngx-device-detector
import { DeviceDetectorModule } from 'ngx-device-detector';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material-module';

import { Router } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';


import { AppComponent } from './app.component';
import { NavComponent } from './component/nav/nav.component';
import { FooterComponent } from './component/footer/footer.component';
import { HomeComponent } from './component/home/home.component';
import { AboutComponent } from './component/about/about.component';
import { PaychannelComponent } from './component/module/paychannel/paychannel.component';
import { FreechannelComponent } from './component/module/freechannel/freechannel.component';
import { BouquetComponent } from './component/module/bouquet/bouquet.component';
import { MycartComponent } from './component/module/mycart/mycart.component';


import { FreechannelService } from './component/module/freechannel/freechannel.service';
import { PaychannelService } from './component/module/paychannel/paychannel.service';
import { MandatorychannelService } from './component/module/mandatorychannel.service';
import { BouquetlistService } from './component/module/bouquet/bouquetlist.service';
import { LocalStorageService } from './component/module/local-storage.service';

import { startsWithPipe } from './component/module/freechannel/customstart.pipes';
import { CustomPayPipe } from './component/module/paychannel/custompay.pipes';
import { CustomBouquetPipe } from './component/module/bouquet/custombouquet.pipes';


@NgModule({
  imports: [BrowserModule, FormsModule, AppRoutingModule, MaterialModule, BrowserAnimationsModule, HttpClientModule, WebStorageModule, NgxPrintModule, NgxSpinnerModule,   DeviceDetectorModule.forRoot()],
  declarations: [AppComponent, NavComponent, FooterComponent, HomeComponent, PaychannelComponent, FreechannelComponent, BouquetComponent, AboutComponent, MycartComponent,
    startsWithPipe, CustomPayPipe, CustomBouquetPipe
  ],
  bootstrap: [AppComponent],
  providers: [FreechannelService, LocalStorageService, PaychannelService, MandatorychannelService, BouquetlistService]
})
export class AppModule { }
