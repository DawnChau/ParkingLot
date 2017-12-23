import {ChangeDetectorRef, Component} from '@angular/core';
import { NavController } from 'ionic-angular';
import {LoginPage} from "../login/login";
import {NOT_PARK, URI_PREFIX} from "./Constants";
import {HttpClient} from "@angular/common/http";
import {UserService} from "../../service/userService";
import {ParkingLotListPage} from "../parking-lot-list/parking-lot-list";
import {TabsPage} from "../tabs/tabs";
import {ConInfoService} from "../../service/conInfoService";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  state:string;
  cost:string;
  startTime:string;
  endTime:string;
  date = new Date();

  constructor(public navCtrl: NavController,private http:HttpClient,private userService:UserService,
              private conInfoService:ConInfoService) {

  }

  ionViewWillEnter(){
    this.startTime="开始时间：";
    this.endTime="结束时间：";
    this.cost='花费：';
    this.state="状态：";

    if(LoginPage.myUser.state==0 || LoginPage.myUser.state == undefined){
      this.state+="未停车";
      if(LoginPage.myUser.state == undefined){
        //新存入值
        LoginPage.myUser.state= NOT_PARK;
        this.http.put(URI_PREFIX+'/Users/'+LoginPage.myUser.id,this.userService.setStateFirstly(LoginPage.myUser),this.userService.myHead)
          .toPromise()
          .then(res=>{
            console.log('状态初始化成功');
          });
      }
    }else if(LoginPage.myUser.state==1){
      this.state+="正在停车";
    }

    if(LoginPage.myUser.starttime!='' && LoginPage.myUser.starttime!=undefined){
      alert(LoginPage.myUser.starttime);
      this.startTime="开始时间："+LoginPage.myUser.starttime;
    }

    if(LoginPage.myUser.endtime!="" && LoginPage.myUser.endtime != undefined){
      this.endTime="结束时间："+LoginPage.myUser.endtime;
    }
  }

  homePark() {
    this.navCtrl.push(ParkingLotListPage);
  }

  homeStop() {
    LoginPage.myConinfo.isoccupy=0;
    this.http.put(URI_PREFIX+'/Coninfo/'+LoginPage.myConinfo.id,
      this.conInfoService.setConInfo(LoginPage.myConinfo),this.conInfoService.myHead)
      .toPromise()
      .then(res=>{
        alert("取车成功");
        LoginPage.myUser.endtime=this.date.getFullYear()+"年" + (this.date.getMonth()+1)+"月"+this.date.getDay()+"日"+
          this.date.getHours()+"时"+this.date.getMinutes()+"分";
        LoginPage.myUser.state=0;
        LoginPage.myUser.pid=undefined;
        LoginPage.myUser.cid=undefined;
        LoginPage.endHour=this.date.getHours();
        this.ionViewWillEnter()
        //this.navCtrl.push(TabsPage);

      })
      .catch(error=>{
        alert("停车失败");
      });
  }
}
