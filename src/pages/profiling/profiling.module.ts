import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfilingPage } from './profiling';

@NgModule({
  declarations: [
    ProfilingPage,
  ],
  imports: [
    IonicPageModule.forChild(ProfilingPage),
  ],
})
export class ProfilingPageModule {}
