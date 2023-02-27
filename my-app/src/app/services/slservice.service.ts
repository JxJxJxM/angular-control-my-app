import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AutoAbastoRequest } from '../Models/AutoAbastoRequest';
import { ValeResponse } from '../Models/ValeResponse';

@Injectable({
  providedIn: 'root'
})
export class SLServiceService {

  private baseUrl= environment.sapServiceBaseUrl;
  private valesUrl = this.baseUrl +'api/SL/CreateDocumentSAP';
  private updateValeUrl = this.baseUrl +'api/SL/UpdateOrConfirmation';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor(private http: HttpClient) { }


  createVale(request:AutoAbastoRequest): Observable<ValeResponse> {
    return this.http.post<ValeResponse>(this.valesUrl, request, this.httpOptions);
  }

  confirmVale(request: any):Observable<ValeResponse> {
    return this.http.post<ValeResponse>(this.updateValeUrl, request,this.httpOptions);
  }

  updateVale(request:any): Observable<ValeResponse> {
    return this.http.post<ValeResponse>(this.updateValeUrl, request, this.httpOptions);
  }
}
