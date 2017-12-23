import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConcretePage } from './concrete';

@NgModule({
  declarations: [
    ConcretePage,
  ],
  imports: [
    IonicPageModule.forChild(ConcretePage),
  ],
})
export class ConcretePageModule {}
