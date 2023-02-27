import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DatabaseInfo } from '../Models/DatabaseInfo';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DatabaseInfoService {

  private baseUrl= environment.sapServiceBaseUrl;
  private dbinfoUrl = this.baseUrl +'api/DataValues/DataBaseInfo';

  constructor(private http: HttpClient) { }

  getDataBaseInfo(): Observable<DatabaseInfo[]> {
    return this.http.get<DatabaseInfo[]>(this.dbinfoUrl)
  }
}
