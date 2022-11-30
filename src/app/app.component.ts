import { Component } from '@angular/core';
import { map } from 'rxjs';

import { LoginService } from './Services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AuthenticUserRegistration';
  sidebarExpanded = true;
  
   userDetail=sessionStorage['currentUser'];
     userData=JSON.parse(this.userDetail);
     UserNName=this.userData.name;
 
  constructor(public loginService:LoginService){}
  logout()
  {
    this.loginService.LogOut();
  }
  login(){
    


  }

}
