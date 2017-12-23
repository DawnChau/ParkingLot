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
  points = [];
  markers = [];

  @ViewChild('map') map_container: ElementRef;
  map: any;//地图对象


  constructor(public navCtrl: NavController, public navParams: NavParams,
              private http:HttpClient,
              private parkService:ParkService) {
    this.init();

  }

  ionViewDidEnter() {
    let map = this.map = new BMap.Map(this.map_container.nativeElement, { enableMapClick: true });

    //当前位置
    let now = new BMap.Point(121.442396,31.028615);


    //设置中心和地图显示级别
    map.centerAndZoom(now, 17);

    //添加控制器
    map.addControl(new BMap.MapTypeControl());
    map.addControl(new BMap.NavigationControl());

    //设置地图尺寸
    let sizeMap = new BMap.Size(10, 80);

    //启动滚轮放大缩小，默认禁用
    map.enableScrollWheelZoom(true);

    //连续缩放效果，默认禁用
    map.enableContinuousZoom(true);

    //设置覆盖物
    let nowMarker = new BMap.Marker(now);
    //let park1Marker = new BMap.Marker(park1);
    //let park2Marker = new BMap.Marker(park2);


    //添加覆盖物到地图
    map.addOverlay(nowMarker);
    //map.addOverlay(park1Marker);
    //map.addOverlay(park2Marker);

    //设置覆盖物的点击提示
    var park1Opts = {
      title : "软件学院停车场" ,
    }
    var park1Window = new BMap.InfoWindow("地址：上海交通大学软件学院", park1Opts);  // 创建信息窗口对象
    //park1Marker.addEventListener("click", function(){
      //map.openInfoWindow(park1Window,park1); //开启信息窗口
    //});

    var park2Opts = {
      title : "总停车场" ,
    }
    var park2Window = new BMap.InfoWindow("地址：上海交通大学软件学院", park2Opts);  // 创建信息窗口对象
    //park2Marker.addEventListener("click", function(){
      //map.openInfoWindow(park2Window,park2); //开启信息窗口
    //});


    var driving = new BMap.DrivingRoute(map, {renderOptions: {map: map, panel: "r-result", autoViewport: true}});
    //driving.search(now, park1);


    //var driving = new BMap.DrivingRoute(map, {renderOptions:{map: map, autoViewport: true}});
    //driving.search(now, park1);
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

        for(var j = 0;j<this.parks.length;j++){
            this.points.push(new BMap.Point(this.parks[j].lon,this.parks[j].lat));
            this.
        }
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


  myNavigation(item: any) {

  }
}
