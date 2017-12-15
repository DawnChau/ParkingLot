

export class Users{
  id:number;
  carid:string;
  phonenum:string;
  password:string;
  state:number;
  pid:number;
  starttime:string;
  endtime:string;
  cost:number;
  cid:number;

  public constructor(
    fields?:{
      id:number;
      carid:string;
      phonenum:string;
      password:string;
      state:number;
      pid:number;
      starttime:string;
      endtime:string;
      cost:number;
      cid:number;
    }
  ){
    if(fields)
      Object.assign(this,fields);
  }

}
