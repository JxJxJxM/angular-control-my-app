import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { WorkOrder } from '../Models/WorkOrder';
import { WorkOrderRequest } from '../Models/WorkOrderRequest';

@Injectable({
  providedIn: 'root'
})
export class WorkOrdersService {

  private baseUrl= environment.sapServiceBaseUrl;
  private workOrdersUrl = this.baseUrl +'api/OrdenServicios/CreateOrdenServicio';
  private getWorkOrdersUrl = this.baseUrl +'api/OrdenServicios/GetAllOrdenServicio'
  private updateWorkOrderUrl = this.baseUrl + 'api/OrdenServicios/UpdateOrdenServicio';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor(private http: HttpClient) { }


  createWorkOrder(request:WorkOrderRequest): Observable<WorkOrder> {
    return this.http.post<WorkOrder>(this.workOrdersUrl, request, this.httpOptions);
  }

  getWorkOrders(): Observable<WorkOrder[]> {
    return this.http.get<WorkOrder[]>(this.getWorkOrdersUrl);
  }

  changeWorkOrderStatus(id:number, newStatus:string): Observable<WorkOrder> {
    return this.http.post<WorkOrder>(this.updateWorkOrderUrl, {id:id,status:newStatus}, this.httpOptions);
  }


}
