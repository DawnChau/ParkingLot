import { Component } from '@angular/core';
import { HomePage} from "../home/home";

import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {TabsPage} from "../tabs/tabs";
import {HttpClient} from "@angular/common/http";
import {URI_PREFIX} from "../home/Constants";
import 'rxjs/add/operator/toPromise'
import {Users} from "../../model/usersModel";
import {UserService} from "../../service/userService";
import {RegisterPage} from "../register/register";
import {ConInfo} from "../../model/conInfoModel";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers:[UserService]
})
export class LoginPage {

  phoneNum:string;
  password:string;

  static myUser:Users=null;
  static startHour:number;
  static endHour:number;
  static myConinfo:ConInfo=null;


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private userService:UserService,
              private http:HttpClient) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  logIn() {
    // 拿到用户名和密码，然后去服务器get一下。
    return this.http.get(URI_PREFIX+ '/Users/?Users.phonenum='+this.phoneNum).toPromise()
      .then(data=>{
        LoginPage.myUser = this.userService.setUser(data['Users'][0]);
        if(LoginPage.myUser.password!=this.password){
          alert("密码错误");
          return ;
        }
        this.navCtrl.push(TabsPage);
      }).catch(error=>{
        alert("用户未注册");
      });

  }

  register(){
    this.navCtrl.push(RegisterPage);
  }

}
