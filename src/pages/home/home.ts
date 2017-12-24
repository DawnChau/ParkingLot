import {ChangeDetectorRef, Component} from '@angular/core';
import { NavController } from 'ionic-angular';
import {LoginPage} from "../login/login";
import {NOT_PARK, URI_PREFIX} from "./Constants";
import {HttpClient} from "@angular/common/http";
import {UserService} from "../../service/userService";
import {ParkingLotListPage} from "../parking-lot-list/parking-lot-list";
import {TabsPage} from "../tabs/tabs";
import {ConInfoService} from "../../service/conInfoService";
import {OrderService} from "../../service/orderService";
import {Order} from "../../model/orderModel";
import {ParkService} from "../../service/parkService";

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
              private conInfoService:ConInfoService,
              private orderService: OrderService,
              private parkService:ParkService) {

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
      this.startTime="开始时间："+LoginPage.myUser.starttime;
    }

    if(LoginPage.myUser.endtime!="" && LoginPage.myUser.endtime != undefined){
      this.endTime="结束时间："+LoginPage.myUser.endtime;
    }else{
      this.endTime="结束时间：";
    }

    if(LoginPage.myUser.cost!=0 && LoginPage.myUser.cost != undefined){
      this.cost="花费："+LoginPage.myUser.cost+"元";
    }else{
      this.cost="花费：";
    }
  }

  homePark() {
    if(LoginPage.myUser.state == 1){
      alert("您此刻正处于停车状态");
      return ;
    }
    this.navCtrl.push(ParkingLotListPage);
  }

  homeStop() {

    if(LoginPage.myUser.state==0){
      alert("您还未停车");
      return ;
    }

    LoginPage.myUser.endtime=this.date.getFullYear()+"年" + (this.date.getMonth()+1)+"月"+this.date.getDate()+"日"+
      this.date.getHours()+"时"+this.date.getMinutes()+"分";
    LoginPage.myUser.state=0;
    LoginPage.endHour=this.date.getHours();
    LoginPage.myUser.cost=(LoginPage.endHour-LoginPage.startHour+1)*LoginPage.price;
    alert("(不足一小时按一小时计算)您此次共停车"+(LoginPage.endHour-LoginPage.startHour+1)+"小时,共花费"+LoginPage.myUser.cost+"元");

    LoginPage.myOrder = new Order()
    LoginPage.myOrder.leave=LoginPage.myUser.endtime;

    var orderData = [];
    orderData['phonenum'] = LoginPage.myUser.phonenum;
    orderData['start'] = LoginPage.myUser.starttime;
    orderData['leave'] = LoginPage.myUser.endtime;
    orderData['charge'] = LoginPage.myUser.cost+"";
    orderData['spaceid'] = LoginPage.myUser.cid+"";
    orderData['lotid'] = LoginPage.myUser.pid+"";

    LoginPage.myOrder = this.orderService.setOrder(orderData);

    LoginPage.myConinfo.isoccupy=0;
    this.http.put(URI_PREFIX+'/Coninfo/'+LoginPage.myConinfo.id,
      this.conInfoService.setConInfo(LoginPage.myConinfo),this.conInfoService.myHead)
      .toPromise()
      .then(res=>{
        alert("取车成功");
        this.ionViewWillEnter()
        //this.navCtrl.push(TabsPage);

        //发送订单
        this.http.post(URI_PREFIX+'/Parkorder/',this.orderService.setOrder(LoginPage.myOrder),
          this.conInfoService.myHead).toPromise().then(res=>{
            alert("订单保存成功");

          //将剩余停车位加一
          LoginPage.myParkInfo.left++;
          this.http.put(URI_PREFIX+'/Park/'+LoginPage.myUser.pid,
            this.parkService.setPark(LoginPage.myParkInfo),this.parkService.myHead).toPromise().then(res=>{
            alert("停车场剩余车位数目更新成功");
            LoginPage.myUser.pid=undefined;
            LoginPage.myUser.cid=undefined;
          }).catch(err=>{
            alert("停车场剩余车位数目更新失败");
          })
        })
      })
      .catch(error=>{
        alert("取车失败");
      });


  }
}
