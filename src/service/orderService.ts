import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Park} from "../model/parkingModel";
import {Order} from "../model/orderModel";

@Injectable()
export class OrderService{

  myHead={
    headers:new HttpHeaders({'Content-Type':'application/json'})
  };

  constructor(private http:HttpClient){}


  setOrder(data:any):Order{
    return new Order({
      phonenum:data['phonenum'],
      start:data['start'],
      leave:data['leave'],
      lotid:data['lotid'],
      spaceid:data['spaceid'],
      charge:data['charge']
    })
  }

}
