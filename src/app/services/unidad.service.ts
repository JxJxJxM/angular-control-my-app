import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Unidad } from '../Models/Unidad';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UnidadService {

  private baseUrl = environment.sapServiceBaseUrl;
  private unidadesUrl = this.baseUrl +'api/DataValues/GetUnidad';

  constructor(private http: HttpClient) { }

  getUnidades(): Observable<Unidad[]> {
    return this.http.get<Unidad[]>(this.unidadesUrl)
  }
}
