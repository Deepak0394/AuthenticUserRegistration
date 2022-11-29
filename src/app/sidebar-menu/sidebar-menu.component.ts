import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.scss']
})
export class SidebarMenuComponent implements OnInit {


  constructor(private route:Router,public loginService:LoginService) { }

  ngOnInit(): void {
 
    
  }
  gotoUser(){
    if(this.loginService.isAdmin())
    {
    this.route.navigateByUrl('/user');
    }
  }

  gotodisplay(){
    if(this.loginService.isAdmin())
    {
    this.route.navigateByUrl('/user/userList');
    }
  }

  gotoHospital(){
    
    if(this.loginService.isHospital())
    {    
      this.route.navigateByUrl('/hospital');
    }    
  }
  gotoDoctor(){
    if(this.loginService.isDoctor())
    {
    this.route.navigateByUrl('/doctor');
    }
  }
  gotosign(){
    this.route.navigateByUrl('/login');
  }
  
  goToAbout()
  {
    this.route.navigateByUrl('/about');
  }
  gotoAddPlan()
  {
    if(this.loginService.isAdmin())
    {
    this.route.navigateByUrl('subscription/subscriptionplan');
    }
  }
  gotoDisPlan()
  {
    this.route.navigateByUrl('subscription');
  }
  gotoClinic()
  {
    if(this.loginService.isClinic())
    {
      this.route.navigateByUrl('clinic')
    }
  }



 
}
