import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Proveedor } from '../Models/Proveedor';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProovedorService {

  private baseUrl= environment.sapServiceBaseUrl;
  private proveedoresUrl = this.baseUrl +'api/DataValues/GetProveedor?empresa=';

  constructor(private http: HttpClient) { }

  getProovedores(empresa:String): Observable<Proveedor[]> {
    return this.http.get<Proveedor[]>(this.proveedoresUrl+empresa)
  }
}
