import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {TabsPage} from "../tabs/tabs";
import {URI_PREFIX} from "../home/Constants";
import {HttpClient} from "@angular/common/http";

/**
 * Generated class for the ParkingLotListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-parking-lot-list',
  templateUrl: 'parking-lot-list.html',
})
export class ParkingLotListPage {

  parkName:string;
  left:string;
  price:string;
  address:string;

  parks = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,private http:HttpClient) {
    this.init();

  }

  init(){
    return this.http.get(URI_PREFIX+ '/Park/').toPromise()
      .then(data=>{
        console.log(data['Park'].length);
        for(var i = 0;i<data['Park'].length;i++){
          this.parks.push();
        }
        console.log('停车场信息加载完成');
        console.log(data);
      }).catch(error=>{
        alert("获取停车场信息失败");
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ParkingLotListPage');
  }

  test(){
    alert("haha");
  }

}
