import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Work } from '../Models/Work';
import { WorkByWorkOrder } from '../Models/WorkByWorkOrder';
import { WorkByWorkOrderRequest } from '../Models/WorkByWorkOrderRequest';

@Injectable({
  providedIn: 'root'
})
export class WorksService {

  private baseUrl= environment.sapServiceBaseUrl;
  private addWorkToWorkOrderUrl = this.baseUrl +'api/OrdenServicios/AddManoObraByOrdenServicio';
  private getWorksByWorkOrderId = this.baseUrl +'api/OrdenServicios/GetManoObraByOrdenServicio?idOrdenServicio=';
  private getAllWorksUrl = this.baseUrl + 'api/ManoDeObra/GetAllManoDeObra';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  getWorksByWOrkOrder(id:string): Observable<WorkByWorkOrder[]> {
    return this.http.get<WorkByWorkOrder[]>(this.getWorksByWorkOrderId+id);
  }

  getAllWorks(): Observable<Work[]> {
    return this.http.get<Work[]>(this.getAllWorksUrl);
  }

  addWorkToWorkOrder(request:WorkByWorkOrderRequest):Observable<WorkByWorkOrder> {
    return this.http.post<WorkByWorkOrder>(this.addWorkToWorkOrderUrl, request, this.httpOptions);
  }

}
