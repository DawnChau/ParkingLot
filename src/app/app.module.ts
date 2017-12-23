import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { ProfilingPage} from "../pages/profiling/profiling";
import { EditPage } from "../pages/edit/edit";
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpClientModule } from "@angular/common/http";
import {UserService} from "../service/userService";
import {RegisterPage} from "../pages/register/register";
import {ParkingLotListPage} from "../pages/parking-lot-list/parking-lot-list";
import { ParkService } from "../service/parkService";
import {BarcodeScanner} from "@ionic-native/barcode-scanner";
import {ConcretePage} from "../pages/concrete/concrete";
import {ConInfoService} from "../service/conInfoService";

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    ProfilingPage,
    EditPage,
    RegisterPage,
    ParkingLotListPage,
    ConcretePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    ProfilingPage,
    EditPage,
    RegisterPage,
    ParkingLotListPage,
    ConcretePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserService,
    ParkService,
    BarcodeScanner,
    ConInfoService
  ]
})
export class AppModule {}
