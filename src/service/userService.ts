import {Injectable} from "@angular/core";
import {Users} from "../model/usersModel";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {URI_PREFIX} from "../pages/home/Constants";
import {Observable} from "rxjs/Observable";
import {catchError} from "rxjs/operators";

@Injectable()
export class UserService{
  myUser:Users = null;
  myHead={
    headers:new HttpHeaders({'Content-Type':'application/json'})
  };

  constructor(private http:HttpClient){}


  setUser(data:any):Users{
    return new Users({
      id:data['id'],
      carid:data['carid'],
      phonenum:data['phonenum'],
      password:data['password'],
      state:data['state'],
      pid:data['pid'],
      starttime:data['starttime'],
      endtime:data['endtime'],
      cost:data['cost'],
      cid:data['cid']
    })
  }

  setUserBody(user:Users):any{
    return {
      "phonenum":user.phonenum,
      "password":user.password,
      "carid":user.carid
    }
  }

  setStateFirstly(user:Users):any{
    return {
      "phonenum":user.phonenum,
      "password":user.password,
      "carid":user.carid,
      "state":user.state
    }
  }
}
