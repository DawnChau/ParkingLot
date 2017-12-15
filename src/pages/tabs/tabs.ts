import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import {ProfilingPage} from "../profiling/profiling";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tabRoots: Object[];

  constructor() {
    this.tabRoots = [
      {
        root: HomePage,
        tabTitle: '主页',
        tabIcon: 'home'
      },
      {
        root: ProfilingPage,
        tabTitle: '个人信息',
        tabIcon: 'person'
      }
    ];
  }
}
