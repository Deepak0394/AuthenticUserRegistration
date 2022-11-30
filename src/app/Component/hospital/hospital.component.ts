import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,  Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CountryISO, PhoneNumberFormat, SearchCountryField } from 'ngx-intl-tel-input';
import { ToastrService } from 'ngx-toastr';
import { Doctor } from '../../Classes/doctor';
import { DoctorService } from '../../Services/doctor.service';
import { Hospital } from '../../Classes/hospital';
import { HospitalService } from '../../Services/hospital.service';
import { LoginService } from '../../Services/login.service';
@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.component.html',
  styleUrls: ['./hospital.component.scss']
})
export class HospitalComponent implements OnInit {

  SearchCountryField = SearchCountryField;
  
  separateDialCode = false;
	Department:any=['Cardiology','Critical Care & ICU','Internal Medicine','Obstetrics & Gynaecology','Orthopedics','Oncology','Radiology','Neuro Surgery','Plastic Surgery','Pediatric'];
	CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
	preferredCountries: CountryISO[] = [CountryISO.India, CountryISO.UnitedStates];
  emailAlredyExist:any;
  phonenumberExist:any;
  existusrname=false;
  existemlname=false;
  existphnname=false;
  userNameExist:any;
  HospitalList:Hospital[]=[];
  doctorlist:Doctor=new Doctor();
  DoctorList:Doctor[]=[]
  newHospital:Hospital=new Hospital();
  submitted: boolean = false;
  saveform!:FormGroup
  constructor(private loginService:LoginService,private fb: FormBuilder,private hospitalService:HospitalService, public doctorService:DoctorService,private route:Router,private toastr:ToastrService) {
    this.saveform = this.fb.group({
      hospitalname: ['', [Validators.required, Validators.maxLength(15), Validators.minLength(3)]],
      facilities:['',[Validators.required,Validators.maxLength(10), Validators.minLength(3)]],
      Department:['',Validators.required],
      // doctorId:['',[Validators.required,Validators.maxLength(10), Validators.minLength(3)]],
      userName:['',[Validators.required,Validators.maxLength(10), Validators.minLength(3)]],
      email:['',[Validators.required,Validators.email,Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}$")]],
      phoneNumber:['',[Validators.required]],
     address:['',[Validators.required,Validators.maxLength(10), Validators.minLength(3)]],
       }) 
   }
  ngOnInit(): void {
    this.getHospitalAll();
    this.getAllDoctors();
  }
  getAllDoctors()
  {
    this.doctorService.getAll().subscribe(
      (response)=>{
        this.DoctorList=response.data;
        console.log(response.data.data)
      },
      (error)=>{
        console.log(error)
      }
    )
  }
  test1(){
    debugger;
    this.saveform.reset();
    this.submitted=false
    this.clearRec();
  }

  changeDepartment(event:any){
    this.Department?.setValue(event.target.value,{
      onlySelf: true,
    });
  }
  getHospitalAll()
  {
    debugger
    if(this.loginService.isAuthenticated())
    {
    
      this.hospitalService.getAll().subscribe((response)=>{
  
        this.HospitalList=response.data;
        console.log(this.HospitalList)
      },(error)=>{
      console.log(error)
      })
      }
      else
      return
    }

    saveClick()
    {debugger
      
      if(this.saveform.invalid)
      {
        this.submitted = true;
        return console.error(this.saveform.errors);
        ;
      }
      this.saveform.value.phoneNumber =this.saveform.value.phoneNumber.internationalNumber
      debugger
      //alert(this.newHospital.doctorId)
      this.hospitalService.saveHospital(this.saveform.value).subscribe(
        (response)=>{
          debugger
          this.emailAlredyExist=response.email
          console.log(this.emailAlredyExist)
          this.userNameExist=response.userName
          console.log(this.userNameExist)
          this.phonenumberExist=response.phoneNumber
          console.log(this.phonenumberExist)
  
  if(this.emailAlredyExist==this.saveform.value.email )
  {
  this.existemlname=true;
  }
  else if(this.userNameExist==this.saveform.value.userName )
  {
   this.existusrname=true;
  }
  
  else if(this.phonenumberExist==this.saveform.value.phoneNumber )
  {
   this.existphnname=true;
  }
  else
  {
    this.route.navigateByUrl('/hospital')
    this.saveform.reset();
    
     this.getHospitalAll();
     this.clearRec();
    console.log(response)
    this.toastr.success("Add Successfully!");
  } 
  this.saveform.reset();     
        },
        (error)=>{
          console.log(error);
  
        }
      )
    }
  clearRec(){
      this.newHospital.hospitalname="";
        this.newHospital.facilities="";
        this.newHospital.department="";
        this.newHospital.userName="";
        this.newHospital.email="";
        this.newHospital.phoneNumber='';
        this.newHospital.address='';

       
  }
  editClick(hp:any)
  {
    this.newHospital=hp;
  }
  updateClick()
  {
    this.hospitalService.updateHospital(this.newHospital).subscribe(
      (response)=>{
        this.getHospitalAll();
        this.toastr.success("Edited Successfully!");
      },
      (error)=>{
        console.log(error);
      }
    )
  }
  deleteClick(id:number)
  {
   debugger;
     this.hospitalService.deleteHospital(id).subscribe(
      (response)=>{
      this.getHospitalAll();
      this.toastr.success("Deleted Successfully!");
      },
      (error)=>{
        console.log(error);
      }
     ) 
  }
  getDoctorId(event:any)
  {
    debugger;
   
     //this.newHospital.doctorId=event.target.value;
     this.doctorlist.id=event.target.value;

  } 
}