import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StockDieselILM } from '../Models/StockDieselILM';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private baseUrl= environment.sapServiceBaseUrl;
  private stockUrl = this.baseUrl +'api/DataValues/GetStockILM?empresa=';

  constructor(private http: HttpClient) { }

  getStock(empresa:String): Observable<StockDieselILM> {
    return this.http.get<StockDieselILM>(this.stockUrl+empresa)
  }
}
