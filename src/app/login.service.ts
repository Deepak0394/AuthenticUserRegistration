import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Login } from './login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
 
isAuthenticate=false
isHosptialUser=false;

userRole:any;

  constructor(private httpClient:HttpClient,private router:Router,private jwtHelperService:JwtHelperService) 
  {
    
        
   }


  checkUser(login:Login):Observable<any>
  {
return this.httpClient.post<any>("https://localhost:44385/api/Registration/LoginUser",login).pipe(map(u=>{
  if(u)
  {
    
sessionStorage["currentUser"]=JSON.stringify(u);

  }
  return u;
}))
  }
  LogOut()
  {
    this.isAuthenticate=false
    
    sessionStorage.removeItem('currentUser');
    this.router.navigateByUrl("/login");
  }

 public isAuthenticated():boolean
  {   
    
 
    if(this.jwtHelperService.isTokenExpired())
    {   
   this.isAuthenticate=false
     this.LogOut()
    
      return false;  
    }
    else
    {    
      this.isAuthenticate=true
      return true;    
    }
}
 
public isHospital() {
  let userDetail=sessionStorage['currentUser'];
  let userData=JSON.parse(userDetail);
  this.userRole =userData.role;
  if (this.userRole == "Hospital" ||this.userRole == "Admin")
   {
    return true;
  }
   else 
   {
    return false;
  }
}
public isAdmin() {
  let userDetail=sessionStorage['currentUser'];
  let userData=JSON.parse(userDetail);
  this.userRole =userData.role;
  if (this.userRole == "Admin")
   {
    return true;
  }
   else 
   {
    return false;
  }
}
public isDoctor() {
  let userDetail=sessionStorage['currentUser'];
  let userData=JSON.parse(userDetail);
  this.userRole =userData.role;
  if (this.userRole == "Doctor" ||this.userRole == "Admin")
   {
    return true;
  }
   else 
   {
    return false;
  }
}
public isClinic() {
  let userDetail=sessionStorage['currentUser'];
  let userData=JSON.parse(userDetail);
  this.userRole =userData.role;
  if (this.userRole == "Clinic" ||this.userRole == "Admin")
   {
    return true;
  }
   else 
   {
    return false;
  }
}


}