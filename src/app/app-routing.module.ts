import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './Component/about/about.component';
import { HomeComponent } from './Component/home/home.component';
import { LoginComponent } from './Component/login/login.component';
import { RegisterComponent } from './Component/register/register.component';
import { ActiveguardService } from './Services/activeguard.service'
import { UserComponent } from './user/user.component';
import { SidebarMenuComponent } from './Component/sidebar-menu/sidebar-menu.component';
import { UserlistComponent } from './user/userlist/userlist.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { BuysubscriptionComponent } from './subscription/buysubscription/buysubscription.component';
import { SubscriptionplanComponent } from './subscription/subscriptionplan/subscriptionplan.component';
import { DoctorComponent } from './Component/doctor/doctor.component';
import { HospitalComponent } from './Component/hospital/hospital.component';
import { AddUserComponent } from './user/add-user/add-user.component';
import { RolesComponent } from './Component/roles/roles.component';
import { ClinicComponent } from './Component/clinic/clinic.component';

const routes: Routes = [
  
  {path:"",redirectTo:"login",pathMatch:'full'},
  {path:"home",component:HomeComponent,canActivate:[ActiveguardService]},
  {path:"about",component:AboutComponent,canActivate:[ActiveguardService]},
  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent},
  {path:"user",component:UserComponent,canActivate:[ActiveguardService]},
  {path:'sidebar-menu',component:SidebarMenuComponent},
  {path:'user/userList',component:UserlistComponent,canActivate:[ActiveguardService]},
  {path:'subscription',component:SubscriptionComponent,canActivate:[ActiveguardService]},
  {path:'subscription/buysubscription',component:BuysubscriptionComponent,canActivate:[ActiveguardService]},
  {path:'subscription/subscriptionplan',component:SubscriptionplanComponent,canActivate:[ActiveguardService]},
  {path:'doctor',component:DoctorComponent,canActivate:[ActiveguardService]},
  {path:'hospital',component:HospitalComponent,canActivate:[ActiveguardService]},
  {path:'user/add-user',component:AddUserComponent,canActivate:[ActiveguardService]},
  {path:'roles',component:RolesComponent},
{path:'clinic',component:ClinicComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
