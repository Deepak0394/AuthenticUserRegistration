import { Component, OnInit } from '@angular/core';
import { Roles } from '../roles';
import { RolesService } from '../roles.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {

  roleList:Roles[]=[];
  constructor(private rolesService:RolesService) { }

  ngOnInit(): void {
this.getRoleList()
  }
  getRoleList()
  {
   this.rolesService.GetRoles().subscribe((response)=>{
    this.roleList=response;
console.log(this.roleList)
   },
   (error)=>{console.log(error)}
   )
  }

}
