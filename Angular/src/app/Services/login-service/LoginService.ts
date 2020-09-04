import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from "@angular/common/http";
import { Login } from 'src/app/models/Login';

@Injectable({
  providedIn: 'root'
})

export class loginService {

  constructor(private httpClient: HttpClient) { }
  
  public loginCheck(userName, password): Observable<Login> {
    let params = new HttpParams()
      .set('userName', userName)
      .set('password', password);

    return this.httpClient.get<Login>("http://localhost:8080/Shidroogim/loginCheck", { params: params });
  }

  public getToken(): Observable<Login> {
   
    return this.httpClient.get<Login>("http://localhost:8080/Shidroogim/getToken");
  }

  public logOut(loginToken): Observable<Login> {
    let params = new HttpParams()
      .set('loginToken', loginToken)

    return this.httpClient.get<Login>("http://localhost:8080/Shidroogim/userLogout", { params: params });
  }
  

}
  