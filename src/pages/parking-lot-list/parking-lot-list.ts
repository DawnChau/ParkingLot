import {Component, ElementRef, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {TabsPage} from "../tabs/tabs";
import {URI_PREFIX} from "../home/Constants";
import {HttpClient} from "@angular/common/http";
import {ParkService} from "../../service/parkService";
import {Park} from "../../model/parkingModel";
import {BarcodeScanner, BarcodeScannerOptions} from "@ionic-native/barcode-scanner";
import {ConcretePage} from "../concrete/concrete";
import {Geolocation} from "@ionic-native/geolocation";

/**
 * Generated class for the ParkingLotListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var BMap;


@IonicPage()
@Component({
  selector: 'page-parking-lot-list',
  templateUrl: 'parking-lot-list.html',
})
export class ParkingLotListPage {

  parks = [];
  points = [];
  opts = [];
  now = null;
  driving = null;

  @ViewChild('map') map_container: ElementRef;
  map: any;//地图对象


  constructor(public navCtrl: NavController, public navParams: NavParams,
              private http:HttpClient,
              private parkService:ParkService) {
  }

  ionViewDidEnter() {
    this.map = this.map = new BMap.Map(this.map_container.nativeElement, { enableMapClick: true });
    this.driving = new BMap.DrivingRoute(this.map, {renderOptions: {map: this.map, panel: "r-result", autoViewport: true}});


        //当前位置
        this.now = new BMap.Point(121.442396,31.028615);

        //设置中心和地图显示级别
        this.map.centerAndZoom(this.now, 17);

        //添加控制器
        this.map.addControl(new BMap.MapTypeControl());
        this.map.addControl(new BMap.NavigationControl());

        //设置地图尺寸
        let sizeMap = new BMap.Size(10, 80);

        //启动滚轮放大缩小，默认禁用
        this.map.enableScrollWheelZoom(true);

        //连续缩放效果，默认禁用
        this.map.enableContinuousZoom(true);

        //设置覆盖物
        let nowMarker = new BMap.Marker(this.now);
        console.log(nowMarker)


        //添加覆盖物到地图
        this.map.addOverlay(nowMarker);

    return this.http.get(URI_PREFIX+ '/Park/').toPromise()
      .then(data=>{
        console.log(data['Park'].length);
        //获取停车场的信息
        if(this.parks.length==0){
          for(var i = 0;i<data['Park'].length;i++){
            this.parks.push(this.parkService.setPark(data['Park'][i]));
          }
          console.log('停车场信息加载完成');
          console.log(data);

          for(var j = 0;j<this.parks.length;j++){
            this.points.push(new BMap.Point(Number(this.parks[j].lon),Number(this.parks[j].lat)));
            let marker = new BMap.Marker(this.points[j]);
            this.map.addOverlay(marker);
            //console.log(this.markers[j])
            var opts = {
              position : this.points[j],    // 指定文本标注所在的地理位置
              offset   : new BMap.Size(10, -10)    //设置文本偏移量
            }
            var label = new BMap.Label(this.parks[j].name, opts);
            this.map.addOverlay(label);
          }

        }
      }).catch(error=>{
        alert("获取停车场信息失败");
      });


    //var driving = new BMap.DrivingRoute(map, {renderOptions:{map: map, autoViewport: true}});
    //driving.search(now, park1);
  }


  //隐藏tabs的操作
  ionViewDidLoad() {
    console.log('ionViewDidLoad EditPage');
  }

  itemSelected(item: Park) {
    this.navCtrl.push(ConcretePage,{
      "pid":item.id,
      "price":item.price,
      "self":item
    });
  }


  myNavigation(item: any) {
    var result = document.getElementById("r-result");
    result.hidden = false;
    this.driving.search(this.now, new BMap.Point(item.lon,item.lat));
  }
}
