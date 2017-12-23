import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {URI_PREFIX} from "../home/Constants";
import {HttpClient} from "@angular/common/http";
import {ConInfoService} from "../../service/conInfoService";
import {ConInfo} from "../../model/conInfoModel";
import {BarcodeScanner, BarcodeScannerOptions} from "@ionic-native/barcode-scanner";
import {LoginPage} from "../login/login";
import {toPromise} from "rxjs/operator/toPromise";
import {TabsPage} from "../tabs/tabs";

/**
 * Generated class for the ConcretePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-concrete',
  templateUrl: 'concrete.html',
})
export class ConcretePage {

  concrete = [];
  pid:string;
  tmpJson:JSON;
  date=new Date();

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private http:HttpClient,
              private conInfoService:ConInfoService,
              private scanner:BarcodeScanner) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConcretePage');
    this.pid=this.navParams.get("pid");
    this.init();
  }


  private init() {
    return this.http.get(URI_PREFIX+ '/Coninfo/?Coninfo.pid='+this.pid).toPromise()
      .then(data=>{
        console.log(data['Coninfo'].length);
        //获取停车场的信息
        for(var i = 0;i<data['Coninfo'].length;i++){
          if(data['Coninfo'][i]['isoccupy']==0){
            this.concrete.push(this.conInfoService.setConInfo(data['Coninfo'][i]));
          }
        }
        console.log('车位信息加载完成');
        console.log(data);
      }).catch(error=>{
        alert("获取车位信息失败");
      });
  }

  park(item: ConInfo) {
    this.scanQR(item);

  }

  scanQR(item: ConInfo) {
    let options: BarcodeScannerOptions = {
      preferFrontCamera: false,//前置摄像头
      showFlipCameraButton: true,//翻转摄像头按钮
      showTorchButton: true,//闪关灯按钮
      prompt: '扫描中……',//提示文本
      formats: 'QR_CODE',//格式
      orientation: 'portrait',//方向
      torchOn: false,//启动闪光灯
      resultDisplayDuration: 500,//显示扫描文本
      disableSuccessBeep: false // iOS and Android
    }
    this.scanner
      .scan(options)
      .then((data) => {
        this.tmpJson = JSON.parse(data.text);
        if(this.tmpJson['pid']==item.pid && this.tmpJson['number']==item.number){
          item.isoccupy=1;
          this.http.put(URI_PREFIX+'/Coninfo/'+item.id,
            this.conInfoService.setConInfo(item),this.conInfoService.myHead)
            .toPromise()
            .then(res=>{
              alert("停车成功");
              LoginPage.myUser.starttime=this.date.getFullYear()+"年" + (this.date.getMonth()+1)+"月"+this.date.getDay()+"日"+
                this.date.getHours()+"时"+this.date.getMinutes()+"分";
              LoginPage.myUser.state=1;
              LoginPage.myUser.pid=item.pid;
              LoginPage.myUser.cid=item.number;
              LoginPage.startHour=this.date.getHours();
              LoginPage.myConinfo=item;
              this.navCtrl.push(TabsPage);

            })
            .catch(error=>{
              alert("停车失败");
            });
        }else{
          alert("请到正确的位置去停车")
        }

      })
      .catch((err) => {
        alert(err.msg);
      });
  }
}
