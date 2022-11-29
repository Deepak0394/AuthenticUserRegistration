import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CountryISO, PhoneNumberFormat, SearchCountryField } from 'ngx-intl-tel-input';
import { ToastrService } from 'ngx-toastr';
import { Clinic } from '../clinic';
import { ClinicService } from '../clinic.service';
import { Doctor } from '../doctor';
import { DoctorService } from '../doctor.service';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-clinic',
  templateUrl: './clinic.component.html',
  styleUrls: ['./clinic.component.scss']
})
export class ClinicComponent implements OnInit {

  constructor(private ClinicService:ClinicService,private route:Router,private loginService:LoginService,private doctorService:DoctorService,private toastr:ToastrService,private fb: FormBuilder) {
    this.saveform = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(15), Validators.minLength(3)]],
      facilities:['',[Validators.required,Validators.maxLength(10), Validators.minLength(3)]],
      // department:['',[Validators.required,Validators.maxLength(25), Validators.minLength(3)]],
      // doctorId:['',[Validators.required,Validators.maxLength(10), Validators.minLength(3)]],
      emergencyNo:['',[Validators.required,Validators.maxLength(10), Validators.minLength(3)]],
      email:['',[Validators.required,Validators.email,Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}$")]],
      phoneNo:['',[Validators.required]],
     address:['',[Validators.required,Validators.maxLength(10), Validators.minLength(3)]],
       }) 
   }

  SearchCountryField = SearchCountryField;
  separateDialCode = false;
	 PhoneNumberFormat = PhoneNumberFormat;
	preferredCountries: CountryISO[] = [CountryISO.India, CountryISO.UnitedStates];
  emailAlredyExist = "";
	CountryISO = CountryISO;
  ClinicList:Clinic[]=[];
  doctorlist:Doctor=new Doctor();
  DoctorList:Doctor[]=[]
  newClinic:Clinic=new Clinic();
  submitted: boolean = false;
  saveform!:FormGroup
  
  ngOnInit(): void {
    this.getAll();
  }

  // getAllDoctors()
  // {
  //   this.doctorService.getAll().subscribe(
  //     (response)=>{
  //       this.DoctorList=response.data;
  //       console.log(response.data.data)
  //     },
  //     (error)=>{
  //       console.log(error)
  //     }
  //   )
  // }


  getAll()
  {
    if(this.loginService.isAuthenticated())
    {
      this.ClinicService.getAll().subscribe((response)=>{
  
        this.ClinicList=response.data;
        console.log(this.ClinicList)
      },(error)=>{
      console.log(error)
      })
      }
    }

    saveClick()
  {
    debugger
    this.saveform.value.phoneNo =this.saveform.value.phoneNo.internationalNumber
    // if(this.saveform.invalid)
    // {
    //   this.submitted = true;
    //   return console.error(this.saveform.errors);
    //   ;
    // }
    this.ClinicService.saveClinic(this.saveform.value).subscribe(
      (response)=>{
        this.route.navigateByUrl('/clinic')
        this.getAll();
        this.clearRec();
        console.log(response)
        this.toastr.success("Add Successfully!");
      },
      (error)=>{
        console.log(error);

      }
    )
  }
  clearRec(){
      this.newClinic.name="";
      this.newClinic.address="";  
      this.newClinic.email=""; 
      this.newClinic.phoneNo="";
      this.newClinic.emergencyNo="";
      // this.newClinic.doctorlist.doctorname="";
      // this.newClinic.doctorlist.expierence="";
      // this.newClinic.doctorlist.qualification="";
      // this.newClinic.doctorlist.specialisedIn="";
  }
  editClick(hp:any)
  {
    this.newClinic=hp;
  }
  updateClick()
  {
    this.ClinicService.updateClinic(this.newClinic).subscribe(
      (response)=>{
        this.getAll();
        this.toastr.success("Edited Successfully!");
      },
      (error)=>{
        console.log(error);
      }
    )
  }
  deleteClick(id:number)
  {
   this.ClinicService.deleteClinic(id).subscribe(
      (response)=>{
      this.getAll();
      this.toastr.success("Deleted Successfully!");
      },
      (error)=>{
        console.log(error);
      }
     ) 
  }
  // getDoctorId(event:any)
  // {
   
   
  //    this.newHospital.doctorId=event.target.value;
  //    this.doctorlist.id=event.target.value;

  // } 

}
