import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HomePage} from "../home/home";
import {LoginPage} from "../login/login";
import {App} from "ionic-angular";
import {EditPage} from "../edit/edit";


/**
 * Generated class for the ProfilingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profiling',
  templateUrl: 'profiling.html',
})
export class ProfilingPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private app:App) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilingPage');
  }

  logOut() {
    alert("haha");
    // 使用根页面跳转，跳转之后的页面不带tabs
    this.app.getRootNav().push(LoginPage);
  }

  edit(phoneNum:HTMLSpanElement, plateNum:HTMLSpanElement) {
    this.app.getRootNav().push(EditPage,{
      phone:phoneNum.innerText,
      plate:plateNum.innerText
    });
  }
}
