import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {LoginPage} from "../login/login";
import {NOT_PARK, URI_PREFIX} from "./Constants";
import {HttpClient} from "@angular/common/http";
import {UserService} from "../../service/userService";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  state:string;
  cost:string;
  startTime:string;
  endTime:string;

  constructor(public navCtrl: NavController,private http:HttpClient,private userService:UserService) {
    if(LoginPage.myUser.state==0 || LoginPage.myUser.state == undefined){
      this.state="状态：未停车";
      if(LoginPage.myUser.state == undefined){
        //新存入值
        LoginPage.myUser.state= NOT_PARK;
        this.http.put(URI_PREFIX+'/Users/'+LoginPage.myUser.id,this.userService.setStateFirstly(LoginPage.myUser),this.userService.myHead)
          .toPromise()
          .then(res=>{
            console.log('状态初始化成功');
          });
      }

    }
    this.startTime="开始时间：";
    this.endTime="结束时间：";
    this.cost='花费：';
  }

}
