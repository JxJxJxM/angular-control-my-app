import { Component, OnInit, ViewChild } from '@angular/core';
import { WorkOrder } from 'src/app/Models/WorkOrder';
import { WorkOrdersService } from 'src/app/services/work-orders.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { TableUtil } from 'src/app/services/TableUtil';



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

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  

  items!:WorkOrder[];
  expandedIndex = 0;
  dataSource!:MatTableDataSource<WorkOrder>;
  columnsToDisplay = ['id','unidad_Name', 'operador_Name', 'empresa', 'sucursal','tipo','status','timestamp'];
  //columnsToDisplay = [{display:'Unidad',column:'unidad_Name'}];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: WorkOrder | null | undefined;

  filteredWorkOrders!:WorkOrder[];

  workOrderTypes= [
    {value: 1, viewValue: 'Todas'},
    {value: 2, viewValue: 'Programada'},
    {value: 3, viewValue:'Urgente'}
  ];
  workOrderTypeFilter = "Todas";


  workOrderStopTypes= [
    {value: 1, viewValue: 'Todos'},
    {value: 2, viewValue: 'Predictivo'},
    {value: 3, viewValue: 'Correctivo'},
    {value: 4, viewValue:'Preventivo'}
  ];
  workOrderStopTypeFilter = "";


  unitName!:String;
  sucursalName!:String;

  constructor(private workOrderService:WorkOrdersService,private _liveAnnouncer: LiveAnnouncer) { }

  ngOnInit(): void {
    this.workOrderService.getWorkOrders().subscribe(result=>{
      this.items = result;
      this.filteredWorkOrders = result;
      this.dataSource = new MatTableDataSource<WorkOrder>(this.filteredWorkOrders);
      this.dataSource.sort=this.sort;
      this.dataSource.paginator=this.paginator;
    })
  }

  createWorkOrder(): void {
    window.location.href="work-orders/create"
  }

  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  exportTable() {
    //TableUtil.exportTableToExcel("ExampleMaterialTable");
    TableUtil.exportArrayToExcel(this.filteredWorkOrders);
  }

  filterVales(): void {
    this.filterByUnit();
    this.filterBySucursal();
    this.filterByworkOrderType();
    this.filterByworkOrderStopType();
    
    //datasource para la lista
    this.dataSource = new MatTableDataSource<WorkOrder>(this.filteredWorkOrders);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort=this.sort;
  }

  filterBySucursal(): void {
    console.log("filtrando por sucursal", this.sucursalName);
    if(this.sucursalName==undefined || this.sucursalName.trim().length==0 ) {
      console.log("Original filter");
      this.filteredWorkOrders=this.filteredWorkOrders;
    
    } else {
      console.log("Filtering by", this.sucursalName);
      this.filteredWorkOrders = this.filteredWorkOrders.filter((workOrder)=>{
        return workOrder.sucursal.toLowerCase().includes(this.sucursalName.toString().toLowerCase()); 
      });
      console.log(this.filteredWorkOrders);
    } 

  }

  filterByUnit(): void {
    console.log("filtrando por unidad", this.unitName);
    if(this.unitName==undefined || this.unitName.trim().length==0 ) {
      console.log("Original filter");
      this.filteredWorkOrders=this.items;
    
    } else {
      console.log("Filtering by", this.unitName);
      this.filteredWorkOrders = this.items.filter((workOrder)=>{
        return (workOrder.unidad_Name.toLowerCase().includes(this.unitName.toString().toLowerCase()) || workOrder.operador_Name.toLowerCase().includes(this.unitName.toString().toLowerCase())
        || workOrder.empresa.toLowerCase().includes(this.unitName.toString().toLowerCase()) || workOrder.timestamp.toLowerCase().includes(this.unitName.toString().toLowerCase())
        || workOrder.id.toString().includes(this.unitName.toString()) 
        );
      });
      console.log(this.filteredWorkOrders);
    } 
  }

  filterByworkOrderType(): void {
    console.log("tye selected", this.workOrderTypeFilter);
    if(this.workOrderTypeFilter!="Todas") {
      console.log("filtering by type ");
      this.filteredWorkOrders = this.filteredWorkOrders.filter((workOrder)=>{
        return workOrder.tipo==this.workOrderTypeFilter;
      });
      console.log(this.filteredWorkOrders);
    } else {
      console.log("returning");
      this.filteredWorkOrders=this.filteredWorkOrders;
    }
  }

  onChangeWorkOrderTypeFilter(event: any): void {
    this.workOrderTypeFilter=event.value;
    this.filterVales();
  }

  filterByworkOrderStopType(): void {
    console.log("tye selected", this.workOrderStopTypeFilter);
    console.log(this.filteredWorkOrders);
    if(this.workOrderStopTypeFilter!="Todos") {
      console.log("filtering by type ");
      this.filteredWorkOrders = this.filteredWorkOrders.filter((workOrder)=>{
        return workOrder.tipoParo==this.workOrderStopTypeFilter;
      });
      console.log(this.filteredWorkOrders);
    } else {
      console.log("returning");
      this.filteredWorkOrders=this.filteredWorkOrders;
    }
  }

  onChangeWorkOrderStopTypeFilter(event: any): void {
    this.workOrderStopTypeFilter=event.value;
    console.log("AJASJJASJA", event);
    this.filterVales();
  }

  
}
