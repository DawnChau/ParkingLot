import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Park} from "../model/parkingModel";
import {ConInfo} from "../model/conInfoModel";

@Injectable()
export class ConInfoService{

  myHead={
    headers:new HttpHeaders({'Content-Type':'application/json'})
  };

  constructor(private http:HttpClient){}


  setConInfo(data:any):ConInfo{
    return new ConInfo({
      id:data['id'],
      pid:data['pid'],
      number:data['number'],
      isoccupy:data['isoccupy']
    })
  }

}
