import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Operador } from '../Models/Operador';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OperadorService {

  private baseUrl= environment.sapServiceBaseUrl;
  private operadoresUrl = this.baseUrl +'api/DataValues/GetOperador';

  constructor(private http: HttpClient) { }

  getOperadores(): Observable<Operador[]> {
    return this.http.get<Operador[]>(this.operadoresUrl)
  }
}
