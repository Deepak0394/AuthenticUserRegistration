import { Component } from '@angular/core';

import { LoginService } from './login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AuthenticUserRegistration';
  sidebarExpanded = true;
  constructor(public loginService:LoginService){}
  logout()
  {
    this.loginService.LogOut();
  }
  

}
