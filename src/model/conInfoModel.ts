

export class ConInfo{
  id:number;
  pid:number;
  isoccupy:number;
  number:number;


  public constructor(
    fields?:{
      id:number;
      pid:number;
      isoccupy:number;
      number:number;
    }
  ){
    if(fields)
      Object.assign(this,fields);
  }

}
