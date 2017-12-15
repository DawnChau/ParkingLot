import { Component } from '@angular/core';
import { HomePage} from "../home/home";

import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {TabsPage} from "../tabs/tabs";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {URI_PREFIX} from "../home/Constants";
import 'rxjs/add/operator/toPromise'

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  phoneNum:string;
  password:string;


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private http:HttpClient) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  logIn() {
    // 拿到用户名和密码，然后去服务器get一下。
    console.log(this.phoneNum);
    console.log(this.password);
    this.http.get(URI_PREFIX+'/Users/?Users.phonenum='+this.phoneNum+'&Users.password='+this.password).toPromise()
      .then(res=>{
        console.log(res);
      })
      .catch(error=>{
        //如果请求出错，打印错误
        console.log(error);
      });
  }

  register(username: HTMLInputElement, password: HTMLInputElement){

  }

}
