import { Component, OnInit } from '@angular/core';
import { WorkOrder } from 'src/app/Models/WorkOrder';
import { WorkOrdersService } from 'src/app/services/work-orders.service';
import {animate, state, style, transition, trigger} from '@angular/animations';


@Component({
  selector: 'app-work-orders',
  templateUrl: './work-orders.component.html',
  styleUrls: ['./work-orders.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class WorkOrdersComponent implements OnInit {

  items!:WorkOrder[];
  expandedIndex = 0;
  dataSource!:WorkOrder[];
  columnsToDisplay = ['id','unidad_Name', 'operador_Name', 'empresa', 'sucursal','tipo','status','timestamp'];
  //columnsToDisplay = [{display:'Unidad',column:'unidad_Name'}];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: WorkOrder | null | undefined;

  constructor(private workOrderService:WorkOrdersService) { }

  ngOnInit(): void {
    this.workOrderService.getWorkOrders().subscribe(result=>{
      this.dataSource=this.items=result;
    })
  }

  createWorkOrder(): void {
    window.location.href="work-orders/create"
  }

  
}
