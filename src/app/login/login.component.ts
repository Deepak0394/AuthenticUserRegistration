import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Login } from '../login';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
user:Login=new Login();
submitted: boolean = false;
saveform!: FormGroup
  constructor(public loginService:LoginService,private router:Router,private fb: FormBuilder,private toastr:ToastrService) {
    this.saveform = this.fb.group({
    
      username:['',[Validators.required,Validators.maxLength(10), Validators.minLength(3)]],
    
password: ['', [Validators.required]],  
    
    })
   }

  ngOnInit(): void {
  }
  loginClick()
  {
    if (this.saveform.invalid) // true if any form validation fail
    {
      this.submitted = true;
      return;
    }
   debugger
    this.loginService.checkUser(this.saveform.value).subscribe(
      (response)=>{   
        let userRole=response.role;
        if(userRole=='Hospital')
        {
          console.log(userRole)
          this.toastr.success("Welcome to Paperless Prescription ",'Login Successfully ',);
          this.router.navigateByUrl("/home"); 
        }
        else if(userRole=='Admin')
        {
          console.log(userRole)
          this.toastr.success("Welcome to Paperless Prescription ",'Login Successfully ',);
          this.router.navigateByUrl("/home"); 
        }
        else 
        {
          alert("page not found");
        }
              
      },
      (error)=>{console.log(error)
        this.toastr.error('Username and password not matched','Kindly enter correct Username and Password')
      //  alert('User Name and Password Not Matched');

      }   
    )

  }
}
