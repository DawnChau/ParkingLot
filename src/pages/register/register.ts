import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {LoginPage} from "../login/login";
import {HttpClient} from "@angular/common/http";
import {UserService} from "../../service/userService";
import {URI_PREFIX} from "../home/Constants";
import {Users} from "../../model/usersModel";

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  phoneNumReg:string;
  passwordReg:string;
  plateNumReg:string;
  registerUser:Users=null;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private http:HttpClient,
              private userService:UserService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  cancel(){
    this.navCtrl.pop();
  }

  realRegister():Promise<any>{
    this.registerUser = new Users();
    this.registerUser.phonenum = this.phoneNumReg;
    this.registerUser.password = this.passwordReg;
    this.registerUser.carid = this.plateNumReg;

    console.log(this.plateNumReg);
    console.log(this.registerUser.carid);

    return this.http.post(URI_PREFIX+'/Users/',this.userService.setUserBody(this.registerUser),this.userService.myHead)
      .toPromise().then(data=>{
        alert("注册成功");
        this.navCtrl.pop();
      }).catch(error=>{
        alert("注册失败");
        this.navCtrl.pop();
      });
  }

}
