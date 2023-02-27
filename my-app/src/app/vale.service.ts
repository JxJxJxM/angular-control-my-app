import { Injectable } from '@angular/core';
import { ValeDataInfo } from './Models/ValeDataInfo';
import { catchError, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Vale } from './Models/Vale';
import { AutoAbastoRequest } from './Models/AutoAbastoRequest';
import { ValeResponse } from './Models/ValeResponse';
import { environment } from 'src/environments/environment';
import { FileRequest } from './Models/FileRequest';
import { FileResponse } from './Models/FileResponse';

@Injectable({
  providedIn: 'root'
})
export class ValeService {

  private baseUrl= environment.sapServiceBaseUrl;
  private valesUrl = this.baseUrl + 'api/Vales';
  private valesByUnidad = this.baseUrl + 'api/Vales/GetValeByUnidad?code=';
  private valesByUnidadTop5 = this.baseUrl + 'api/Vales/GetValeByUnidadTop?code=';
  private valeById = this.baseUrl + 'api/Vales/';
  private filesUrl = this.baseUrl + "api/SL/Upload";
  private getFileUrl = this.baseUrl + 'api/SL/GetListFiles?empresa=';
  private deleteValeUrl = this.baseUrl + 'api/SL/CancellValeDocumentSAP?IdVale=';

  private httpOptions = {
    headers: new HttpHeaders({
      
      'Access-Control-Allow-Origin': "*"
    })
  };

  constructor(private http: HttpClient) { }

  getVales(): Observable<Vale[]> {
    return this.http.get<Vale[]>(this.valesUrl);
  }

  getValeById(id:Number): Observable<Vale> {
    return this.http.get<Vale>(this.valeById+id);
  }

  getValesByUnidad(unidadCode:String): Observable<Vale[]> {
    return this.http.get<Vale[]>(this.valesByUnidad+unidadCode);
  }

  getValesByUnidadTop5(unidadCode:String): Observable<Vale[]> {
    return this.http.get<Vale[]>(this.valesByUnidadTop5+unidadCode);
  }

  createVale(request:AutoAbastoRequest): Observable<ValeResponse> {
    return this.http.post<ValeResponse>(this.valesUrl, request, this.httpOptions).pipe(
      (response)=>{console.log(response); return response; }
    );
  }

  uploadFile(request: FileRequest) : Observable<FileResponse> {
    return this.http.post<FileResponse>(this.filesUrl, request, this.httpOptions).pipe(
      (response)=>{console.log(response); return response; }
    );
  }

  getFile(empresa:string, keySAPid:string): Observable<FileResponse[]> {
    return this.http.get<FileResponse[]>(this.getFileUrl+empresa+'&KeySapId='+keySAPid);
  } 

  deleteVale(valeId:string): Observable<String> {
    return this.http.post<String>(this.deleteValeUrl+valeId,null,this.httpOptions).pipe(
      (response)=>{console.log(response); return response}
    );
  }


}
