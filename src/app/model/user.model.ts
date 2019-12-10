import * as uuid from "uuid/v1";

export class User{
  id: string
  constructor(public fName: string, public lName: string, public password: string, public email: string, public contactNumber: string, id?: string){
    if(id){
      this.id = id;
    }else{
      this.id = uuid();
    }
  }
}
