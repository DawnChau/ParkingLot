import {Component, ElementRef, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {TabsPage} from "../tabs/tabs";
import {URI_PREFIX} from "../home/Constants";
import {HttpClient} from "@angular/common/http";
import {ParkService} from "../../service/parkService";
import {Park} from "../../model/parkingModel";
import {BarcodeScanner, BarcodeScannerOptions} from "@ionic-native/barcode-scanner";
import {ConcretePage} from "../concrete/concrete";

/**
 * Generated class for the ParkingLotListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var BMap;
declare var BMap_Symbol_SHAPE_POINT;

@IonicPage()
@Component({
  selector: 'page-parking-lot-list',
  templateUrl: 'parking-lot-list.html',
})
export class ParkingLotListPage {

  parks = [];

  @ViewChild('map') map_container: ElementRef;
  map: any;//地图对象
  //marker: any;//标记

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private http:HttpClient,
              private parkService:ParkService) {
    this.init();

  }

  ionViewDidEnter() {
    let map = this.map = new BMap.Map(this.map_container.nativeElement, { enableMapClick: true });//创建地图实例

    // map.centerAndZoom("广州",17); //设置城市设置中心和地图显示级别
    let point = new BMap.Point(121.442396,31.028615);//坐标可以通过百度地图坐标拾取器获取
    map.centerAndZoom(point, 17);//设置中心和地图显示级别

    map.addControl(new BMap.MapTypeControl());
    // map.setCurrentCity("广州");

    let sizeMap = new BMap.Size(10, 80);//显示位置
    map.addControl(new BMap.NavigationControl());


    map.enableScrollWheelZoom(true);//启动滚轮放大缩小，默认禁用
    map.enableContinuousZoom(true);//连续缩放效果，默认禁用

    let myIcon = new BMap.Icon("assets/icon/favicon.ico",new BMap.Size(300,157));

    //let marker = this.marker = new BMap.Marker(point,{icon:myIcon});
    let maker = new BMap.Marker(point);
    map.addOverlay(maker);
    var opts = {
      title : "软件学院停车场" , // 信息窗口标题
    }
    var infoWindow = new BMap.InfoWindow("地址：上海交通大学软件学院", opts);  // 创建信息窗口对象
    maker.addEventListener("click", function(){
      map.openInfoWindow(infoWindow,point); //开启信息窗口
    });

    let park1 = new BMap.Point(121.448317,31.028597);
    let park1Maker = new BMap.Marker(park1);
    map.addOverlay(park1Maker);

    var driving = new BMap.DrivingRoute(map, {renderOptions:{map: map, autoViewport: true}});
    driving.search(point, park1);
  }

  init(){
    return this.http.get(URI_PREFIX+ '/Park/').toPromise()
      .then(data=>{
        console.log(data['Park'].length);
        //获取停车场的信息
        for(var i = 0;i<data['Park'].length;i++){
          this.parks.push(this.parkService.setPark(data['Park'][i]));
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


  itemSelected(item: Park) {
    this.navCtrl.push(ConcretePage,{
      "pid":item.id
    });
  }


}
