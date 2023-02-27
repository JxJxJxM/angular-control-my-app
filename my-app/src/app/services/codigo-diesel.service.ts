import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CodigoDiesel } from '../Models/CodigoDiesel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CodigoDieselService {

  private baseUrl= environment.sapServiceBaseUrl;
  private codigoDieselUrl = this.baseUrl +'api/DataValues/GetDiselCode?empresa=';

  constructor(private http: HttpClient) { }

  getCodigosDiesel(empresa:String, tipo:String): Observable<CodigoDiesel[]> {
    return this.http.get<CodigoDiesel[]>(this.codigoDieselUrl+empresa+"&tipo="+tipo)
  }
}
