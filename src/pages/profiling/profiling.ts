import {ChangeDetectorRef, Component} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HomePage} from "../home/home";
import {LoginPage} from "../login/login";
import {App} from "ionic-angular";
import {EditPage} from "../edit/edit";
import {Users} from "../../model/usersModel";


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
  phoneNumProf:string;
  plateNumProf:string;

  constructor(public navCtrl: NavController, public navParams: NavParams,private app:App,public cd:ChangeDetectorRef) {
    console.log(LoginPage.myUser);
    this.phoneNumProf = LoginPage.myUser.phonenum;
    this.plateNumProf = LoginPage.myUser.carid;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilingPage');
  }
  ionViewDidEnter(){
    console.log('ionViewDidEnter ProfilingPage');
  }

  ionViewWillEnter(){
    console.log('ionViewWillEnter ProfilingPage');
    this.phoneNumProf = LoginPage.myUser.phonenum;
    this.plateNumProf = LoginPage.myUser.carid;
  }

  logOut() {
    //退出登录，清空信息
    LoginPage.myUser=null;
    // 使用根页面跳转，跳转之后的页面不带tabs
    this.app.getRootNav().push(LoginPage);
  }

  edit(phoneNum:HTMLSpanElement, plateNum:HTMLSpanElement) {
    //this.app.getRootNav().push(EditPage);
    this.navCtrl.push(EditPage);
  }
}
