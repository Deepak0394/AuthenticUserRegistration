import { Doctor } from "./doctor";


export class Hospital {
    id:number;
    hospitalname:any;
    facilities:any;
    department:any;
    
    // doctorId:any;
  doctorlist!:Doctor;
  email:any;
  phoneNumber:any;
  address:any;
  userName:any;

    constructor()
    {
    this.id=0;
    this.hospitalname=null;
    this.facilities=null;
    this.department=null; 
   this.email='';
   this.phoneNumber='';
   this.address='';
   this.userName='';
    }
}
