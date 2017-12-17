import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ParkingLotListPage } from './parking-lot-list';

@NgModule({
  declarations: [
    ParkingLotListPage,
  ],
  imports: [
    IonicPageModule.forChild(ParkingLotListPage),
  ],
})
export class ParkingLotListPageModule {}
