export class Order{
  phonenum:string;
  start:string;
  leave:String;
  lotid:string;
  spaceid:string;
  charge:string;



  public constructor(
    fields?:{
      phonenum:string;
      start:string;
      leave:String;
      lotid:string;
      spaceid:string;
      charge:string;
    }
  ){
    if(fields)
      Object.assign(this,fields);
  }

}
