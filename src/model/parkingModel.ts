

export class Park{
  id:number;
  name:string;
  left:number;
  price:string;
  address:string;
  total:number;
  lon:string;
  


  public constructor(
    fields?:{
      id:number;
      name:string;
      left:number;
      price:string;
      address:string;
    }
  ){
    if(fields)
      Object.assign(this,fields);
  }

}
