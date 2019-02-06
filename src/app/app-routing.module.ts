import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './component/home/home.component';
import { AboutComponent } from './component/about/about.component';
import { PaychannelComponent } from './component/module/paychannel/paychannel.component';
import { FreechannelComponent } from './component/module/freechannel/freechannel.component';
import { BouquetComponent } from './component/module/bouquet/bouquet.component';
import { MycartComponent } from './component/module/mycart/mycart.component';
// import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
   { path: 'home', component: HomeComponent },
//  { path: 'login', component: LoginComponent },
  { path: 'about', component: AboutComponent },
  { path: 'paychannel', component: PaychannelComponent },
  { path: 'freechannel', component: FreechannelComponent },
  { path: 'bouquetlist', component: BouquetComponent },
  { path: 'myCart', component: MycartComponent },
 { path: '**', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
