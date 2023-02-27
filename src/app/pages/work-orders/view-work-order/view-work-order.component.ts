import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { identity } from 'rxjs';
import { Work } from 'src/app/Models/Work';
import { WorkByWorkOrder } from 'src/app/Models/WorkByWorkOrder';
import { WorkByWorkOrderRequest } from 'src/app/Models/WorkByWorkOrderRequest';
import { WorkOrder } from 'src/app/Models/WorkOrder';
import { WorkOrdersService } from 'src/app/services/work-orders.service';
import { WorksService } from 'src/app/services/works.service';
import { AddWorkComponent } from '../../modales/add-work/add-work.component';
import { ConfirmComponent } from '../../modales/confirm/confirm.component';

@Component({
  selector: 'app-view-work-order',
  templateUrl: './view-work-order.component.html',
  styleUrls: ['./view-work-order.component.css'],
  providers: [MatDialog]
})
export class ViewWorkOrderComponent implements OnInit {

  @Input()  workOrder!:WorkOrder;
  worksByOrder!: WorkByWorkOrder[];
  allWorks!: Work[];
  allWorksMap = new Map();
  editing:boolean = false;

  constructor(private worksService: WorksService, public dialog: MatDialog, private workOrderService: WorkOrdersService) { }

  ngOnInit(): void {
    this.getAllWorks();
    this.worksService.getWorksByWOrkOrder(this.workOrder.id.toString()).subscribe(success=>{
      this.worksByOrder=success;
    }, error=>{

    });
  }

  getAllWorks(): void {
    this.worksService.getAllWorks().subscribe(response=>{
      this.allWorks=response;
      response.forEach(w=>{
        this.allWorksMap.set(w.id,w);
      });
      
    }, error=>{

    })
  }

  startWorkorderModal(): void {
    /*if(this.fieldsWithErrors()) {
       this.snackBar.open("Algunos campos son requeridos o tienen error favor de verificar");
       return;
     }*/
     
     const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '400px',
      data: "Estas seguro de iniciar esta orden de servicio?"
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if(result){
        this.startWorkOrder();
      } else {
        
      }
    });
   }

   finishWorkorderModal(): void {
    /*if(this.fieldsWithErrors()) {
       this.snackBar.open("Algunos campos son requeridos o tienen error favor de verificar");
       return;
     }*/
     
     const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '400px',
      data: "Estas seguro de finalizar esta orden de servicio?"
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if(result){
        this.finishWorkOrder();
      } else {
        
      }
    });
   }

  startWorkOrder(): void {
    this.workOrderService.changeWorkOrderStatus(this.workOrder.id,"Iniciada").subscribe(success=>{
      this.workOrder=success;
    }, error=>{

    })
  }

  enableEdit(): void {
    this.editing=!this.editing;
  }

  saveEditedWorkOrderModal(): void {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '600px',
      data:  "Esta seguro de guardar esta orden de trabajo? "
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if(result.ok){
        this.saveEditedWorkOrder();
      } else {
        
      }
    });
  }

  saveEditedWorkOrder(): void {
    alert("guardado");
  }

  finishWorkOrder(): void {
    this.workOrderService.changeWorkOrderStatus(this.workOrder.id,"Finalizada").subscribe(success=>{
      this.workOrder=success;
    }, error=>{

    })
  }

  addWorkModal(): void {
   /*if(this.fieldsWithErrors()) {
      this.snackBar.open("Algunos campos son requeridos o tienen error favor de verificar");
      return;
    }*/
    

    const dialogRef = this.dialog.open(AddWorkComponent, {
      width: '600px',
      data:  this.allWorks
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if(result.ok){
        this.addWorkToWorkOrder(result.selectedWork,result.comments,result.horas,result.total)
      } else {
        
      }
    });
  }

  addWorkToWorkOrder(selectedWork:Work,comments:string, numHours:number, total:number) {
    var request: WorkByWorkOrderRequest = {
      NumeroHoras:numHours,
      comentarios:comments,
      total:total,
      costoxHora:selectedWork.costoXhora,
      empresa:selectedWork.empresa,
      idManoObra:selectedWork.id,
      idOrdenServicio:this.workOrder.id,
      usuario:localStorage.getItem("userName")?.toString()
    };
    
    console.log("Request",request);
    this.worksService.addWorkToWorkOrder(request).subscribe(success=>{
      this.worksByOrder.push(success);
    }, error=>{

    })
   }

}
