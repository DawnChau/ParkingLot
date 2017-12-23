import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Park} from "../model/parkingModel";

@Injectable()
export class ParkService{

  myHead={
    headers:new HttpHeaders({'Content-Type':'application/json'})
  };

  constructor(private http:HttpClient){}


  setPark(data:any):Park{
    return new Park({
      id:data['id'],
      name:data['name'],
      left:data['left'],
      price:data['price'],
      address:data['address'],
      total:data['total'],
      lon:data['lon'],
      lat:data['lat'],
      decrip:data['decrip']
    })
  }

}
