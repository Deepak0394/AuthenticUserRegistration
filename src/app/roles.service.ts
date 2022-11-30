import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor(private httpClient:HttpClient) { }

  GetRoles():Observable<any>
  {
return this.httpClient.get("https://localhost:44385/api/Registration/RolesList");
  }
}
