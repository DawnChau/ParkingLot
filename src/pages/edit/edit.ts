import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {LoginPage} from "../login/login";
import {TabsPage} from "../tabs/tabs";
import {ProfilingPage} from "../profiling/profiling";
import {HttpClient} from "@angular/common/http";
import {UserService} from "../../service/userService";
import {URI_PREFIX} from "../home/Constants";

/**
 * Generated class for the EditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit',
  templateUrl: 'edit.html',
})
export class EditPage {
  phonenumEdit:string;
  passwordEdit:string;
  platenumEdit:string;

  constructor(public navCtrl: NavController, public navParams: NavParams,private http:HttpClient,private userService:UserService,) {
    this.phonenumEdit = LoginPage.myUser.phonenum;
    this.passwordEdit = LoginPage.myUser.password;
    this.platenumEdit = LoginPage.myUser.carid;
  }

  //隐藏tabs的操作
  ionViewDidLoad() {
    console.log('ionViewDidLoad EditPage');
    let elements = document.querySelectorAll(".tabbar");
    if(elements != null) {
      Object.keys(elements).map((key) => {
        elements[key].style.display ='none';
      });
    }
  }

  //显示tabs的操作
  ionViewWillLeave() {
    let elements = document.querySelectorAll(".tabbar");
    if(elements != null) {
      Object.keys(elements).map((key) => {
        elements[key].style.display ='flex';
      });
    }
  }

  cancel(){
    this.navCtrl.pop();
  }

  realEdit() {
    if(this.phonenumEdit!='')
      LoginPage.myUser.phonenum = this.phonenumEdit;
    if(this.passwordEdit!='')
      LoginPage.myUser.password = this.passwordEdit;
    if(this.platenumEdit!='')
      LoginPage.myUser.carid = this.platenumEdit;
    console.log("edit");
    console.log(this.platenumEdit);
    console.log(LoginPage.myUser.carid);

    return this.http.put(URI_PREFIX+'/Users/'+LoginPage.myUser.id,this.userService.setUserBody(LoginPage.myUser),this.userService.myHead)
      .toPromise()
      .then(res=>{
        alert("更新成功");
        this.navCtrl.pop();
      })
      .catch(error=>{
        alert("更新失败");
        this.navCtrl.pop();
      })
  }
}
