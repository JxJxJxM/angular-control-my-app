import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { FloatLabelType } from '@angular/material/form-field';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map, Observable } from 'rxjs';
import { Unidad } from 'src/app/Models/Unidad';
import { WorkOrderRequest } from 'src/app/Models/WorkOrderRequest';
import { UnidadService } from 'src/app/services/unidad.service';
import { WorkOrdersService } from 'src/app/services/work-orders.service';
import { ConfirmComponent } from '../../modales/confirm/confirm.component';

@Component({
  selector: 'app-create-work-order',
  templateUrl: './create-work-order.component.html',
  styleUrls: ['./create-work-order.component.css'],
  providers: [MatSnackBar, MatDialog, {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher}]

})
export class CreateWorkOrderComponent implements OnInit {

  creando:Boolean = false;
  workOrder: WorkOrderRequest = {
    tipo:"",
    operador_Name:"",
    unidad_Code:"",
    unidad_Name:"",
    usuario:localStorage.getItem("userName")!,
    empresa:"",
    sucursal:"",
    status:"",
    comentarios:"",
    tipoParo:"",
    solicitante:"",
    motivodeSolicitud:"",
    descripcionCorta:"",
    falla:""
  };

  constructor(private _formBuilder: FormBuilder, private unidadService: UnidadService, public dialog: MatDialog, private workOrderService: WorkOrdersService,
    private snackBar: MatSnackBar) { }


  hideRequiredControl = new FormControl(true);
  floatLabelControl = new FormControl('auto' as FloatLabelType);
  options = this._formBuilder.group({
    hideRequired: this.hideRequiredControl,
    floatLabel: this.floatLabelControl,
  });

  orderTypes = [
    {name:"Programada",type:1},
    {name:"Urgente",type:2}
  ];
  selectedOrderType!:{name:String,type:number}|undefined;

  stopTypes = [
    {name:"Preventivo",type:1},
    {name:"Correctivo",type:2},
    {name:"Predictivo",type:3}
  ];
  selectedStopType!:{name:String,type:number}|undefined;

  

  unidades: Unidad[] = [];
  filteredUnidades!: Observable<Unidad[]>;
  autoCompControl = new FormControl('',[Validators.required]);
  selectedUnidad : Unidad = {
    itemcode:"",
    itemname:"",
    operador:"",
    telefono:"",
    tipo:"",
    sucursal:"",
    odometro_Final:0,
    rendimiento:0,
    rendimiento_Anterior:0,
    empresa:"",
    nombreEmpresa:"",
    isHrs:"",
    acom:""
  };

  

  ngOnInit(): void {
    this.getUnidades();
    this.addUnidadFilter();
  }

  getFloatLabelValue(): FloatLabelType {
    return this.floatLabelControl.value || 'auto';
  }

  changeWorkOrderType(event:any): void {
   this.workOrder.tipo=event.value.name;
  }

  changeStopType(event:any): void {
    this.workOrder.tipoParo=event.value.name;
   }

  /**
   * Toda la logica de las unidades en esta seccion
   */


  addUnidadFilter(): void {
    this.filteredUnidades = this.autoCompControl.valueChanges.pipe(
      map(value => this._filter(value || ''))
    );
  }

  private _filter(unidad:string): Unidad[] {
    console.log("Filtrando unidades", unidad);
    const filterValue = unidad.toLowerCase();

    return this.unidades.filter(option => option.itemname.toLowerCase().includes(filterValue));
  }

  selectUnidadOption(event:any): void {
    this.selectedUnidad=event.option.value;
    this.workOrder.unidad_Code=this.selectedUnidad.itemcode;
    this.workOrder.unidad_Name=this.selectedUnidad.itemname;
    this.workOrder.operador_Name=this.selectedUnidad.operador;
    this.addUnidadFilter();
  }

  getOptionTextUnidades(option:any) {
    return option.itemname;
  }

  getUnidades():void {
    this.unidadService.getUnidades().subscribe(unidades=>this.unidades = unidades);
  }

  /**
   * Fin de seccion unidades
   */


  /***
   * Toda la logica de operadores en esta seccion
   */

   operadorUpdated(event:any):void {
    console.log("operadorUpdated");
    this.workOrder.operador_Name=this.selectedUnidad.operador;
  }


  /***
   * Fin de seccion operador
   */


  /***
   * Toda la logica para text boxes
   */
  onUpdatedReason(event:any): void {
    this.workOrder.motivodeSolicitud  = event.target.value;
  }

  onUpdatedDescription(event:any): void {
    this.workOrder.descripcionCorta = event.target.value;
  }

  onUpdatedFailure(event:any): void {
    this.workOrder.falla = event.target.value;
  }

  onUpdatedComments(event:any): void {
    this.workOrder.comentarios = event.target.value;
  }

  /***
   * Fin de seccion de text boxes
   */


   openDialog(): void {
    /**if(this.fieldsWithErrors()) {
      this.snackBar.open("Algunos campos son requeridos o tienen error favor de verificar");
      return;
    }*/
    
    this.creando = true;
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '400px',
      data: "Estas seguro de crear esta orden de servicio?"
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if(result){
        this.createOrder();
      } else {
        
      }
    });
  }


  createOrder(): void {
    this.workOrder.status = "Creada";
    this.workOrder.solicitante = this.selectedUnidad.operador;
    this.workOrder.sucursal = this.selectedUnidad.sucursal;
    this.workOrder.empresa = this.selectedUnidad.empresa;

    this.workOrderService.createWorkOrder(this.workOrder).subscribe(response=>{
      this.creando = false;
      this.snackBar.open("Orden creada correctamente" );
    }, error=>{
      console.log("Error creando orden: ", error);
      this.snackBar.open("Error creando orden: "+ error );
      this.creando = false;
    })
    console.log(this.workOrder);
  }


}
