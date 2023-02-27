import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginResponse } from '../Models/LoginResponse';
import { Usuario } from '../Models/Usuario';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private baseUrl= environment.sapServiceBaseUrl;
  private loginUrl = this.baseUrl +'api/Users/Login';
  private getUsersUrl = this.baseUrl + 'api/Users/GetUsers';
  private getUserUrl = this.baseUrl + 'api/Users/';
  private updateUserUrl = this.baseUrl + 'api/Users/UpdateUser';
  private createUserUrl = this.baseUrl + 'api/Users/Create';
  

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor(private http: HttpClient) { }


  login(user:String, pass:String): Observable<LoginResponse> {
    var request = {
      email:user,
      password:pass
    };

    return this.http.post<LoginResponse>(this.loginUrl, request, this.httpOptions);
  }

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.getUsersUrl);
  }

  getUser(id:number): Observable<Usuario> {
    return this.http.get<Usuario>(this.getUserUrl+id);
  }


  updateUser(user:any): Observable<Usuario> {
    return this.http.post<Usuario>(this.updateUserUrl, user,this.httpOptions);
  }

  createUser(user:any): Observable<Usuario> {
    return this.http.post<Usuario>(this.createUserUrl, user, this.httpOptions);
  }



}
