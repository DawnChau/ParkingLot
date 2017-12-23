

export class Park{
  id:number;
  name:string;
  left:number;
  price:string;
  address:string;
  total:number;
  lon:string;
  lat:string;
  decrip:string;



  public constructor(
    fields?:{
      id:number;
      name:string;
      left:number;
      price:string;
      address:string;
      total:number;
      lon:string;
      lat:string;
      decrip:string;
    }
  ){
    if(fields)
      Object.assign(this,fields);
  }

}
