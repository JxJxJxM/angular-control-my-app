import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FloatLabelType } from '@angular/material/form-field';
import { DatabaseInfo } from 'src/app/Models/DatabaseInfo';
import { ValeService } from 'src/app/vale.service';
import { DatabaseInfoService } from 'src/app/services/database-info.service';
import { AutoAbastoRequest } from 'src/app/Models/AutoAbastoRequest';
import { CodigoDieselService } from 'src/app/services/codigo-diesel.service';
import { CodigoDiesel } from 'src/app/Models/CodigoDiesel';
import { Unidad } from 'src/app/Models/Unidad';
import { Operador } from 'src/app/Models/Operador';
import { Proveedor } from 'src/app/Models/Proveedor';
import { UnidadService } from 'src/app/services/unidad.service';
import { OperadorService } from 'src/app/services/operador.service';
import { ProovedorService } from 'src/app/services/proveedor.service';
import { ValeDataInfo } from 'src/app/Models/ValeDataInfo';
import { DocumentLine } from 'src/app/Models/DocumentLine';
import { SLServiceService } from 'src/app/services/slservice.service';
import { OrdenCompraRequest } from 'src/app/Models/OrdenCompraRequest';
import { Vale } from 'src/app/Models/Vale';
import { StockService } from 'src/app/services/stock.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ValeDataInfoAutoAbasto } from 'src/app/Models/ValeDataInfoAutoAbasto';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from '../../modales/confirm/confirm.component';
import { map, Observable, startWith } from 'rxjs';
import { Location } from '@angular/common';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { FileRequest } from 'src/app/Models/FileRequest';



@Component({
  selector: 'app-create-vale',
  templateUrl: './create-vale.component.html',
  styleUrls: ['./create-vale.component.css'],
  providers: [MatSnackBar, MatDialog, {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher}]
})
export class CreateValeComponent implements OnInit{


  latestVales!: Vale[];
  creando:Boolean = false;
  comentariosBox="";
  stockAutoabasto="";
  odometroInicial=0;
  litrosSolicitados=0;
  autoCompControl = new FormControl('',[Validators.required]);
  proveedorCompControl = new FormControl('',[Validators.required]);
  litrosSolicitadosControl = new FormControl('',[Validators.required, Validators.pattern(/^[+-]?\d+(\.\d+)?$/)]);
  kmInicialControl = new FormControl('',[Validators.required, Validators.pattern(/^[+-]?\d+(\.\d+)?$/)]);



  matcher = new ShowOnDirtyErrorStateMatcher();

  

  voucherTypes = [
    {name:"AA",type:60},
    {name:"OC",type:22}
  ]
  selectedVoucher!:{name:String,type:number}|undefined;

  isProveedorDisabled:Boolean = true;

  canCreate:boolean=false;

  request:AutoAbastoRequest = {
    empresa:0,
    objType:0,
    DocumentLines:[],
    valeDataInfo:null,
    Comments:""
  };

  oCRequest:OrdenCompraRequest = {
    empresa:0,
    objType:0,
    Comments:"",
    DocumentLines:[],
    valeDataInfo:null
  };

  valeDataInfo:ValeDataInfo = {
    operador_Name:"",
    unidad_Code:"String",
    unidad_Name: "String",
    km_Inicial:0,
    rendimiento_Optimo:0,
    proveedor:"",
    usuario:"",
    sucursal:"",
    tanqueLLeno:"No"
  };

  valeDataInfoAutoAbasto:ValeDataInfoAutoAbasto = {
    operador_Name:"",
    unidad_Code:"String",
    unidad_Name: "String",
    km_Inicial:0,
    rendimiento_Optimo:0,
    proveedor:"",
    usuario:"",
    sucursal:"",    
    Lbomba_Inicial:0,
    tanqueLLeno:"No"
  };

  

  selectedOperador: Operador | undefined;
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
  selectedProovedor: Proveedor | undefined;
  selectedDieselCode: CodigoDiesel | undefined;
  quantityRequested:number = 0;

  unidades: Unidad[] = [];
  filteredUnidades!: Observable<Unidad[]>;
  filteredProveedores!: Observable<Proveedor[]>;
  operadores: Operador[] = [];
  proovedores: Proveedor[] = [];
  empresas: DatabaseInfo[] = [];
  empresaSelected:number|undefined = undefined;
  tipoVale = "";
  codigoDiesel!: CodigoDiesel[];
  documentLine!:DocumentLine;
  rendimientoOptimo:number=0;


  hideRequiredControl = new FormControl(true);
  floatLabelControl = new FormControl('auto' as FloatLabelType);
  options = this._formBuilder.group({
    hideRequired: this.hideRequiredControl,
    floatLabel: this.floatLabelControl,
  });

  constructor(private _formBuilder: FormBuilder, private valesService: ValeService, 
    private databaseInfoService:DatabaseInfoService, private codigoDieselService:CodigoDieselService, private unidadService:UnidadService,
    private operadorService:OperadorService, private proveedorService:ProovedorService, private slService:SLServiceService, 
    private stockService: StockService, private snackBar: MatSnackBar, public dialog: MatDialog, private location:Location) {}

  getFloatLabelValue(): FloatLabelType {
    return this.floatLabelControl.value || 'auto';
  }

  ngOnInit():void {
    this.getEmpresas();
    this.getUnidades();
    this.getOperadores();
	this.getStock();

  
  this.addUnidadFilter();
  this.addProveedoresFilter();


  }

  addUnidadFilter(): void {
    this.filteredUnidades = this.autoCompControl.valueChanges.pipe(
      map(value => this._filter(value || ''))
    );
  }

  addProveedoresFilter(): void {
    this.filteredProveedores = this.proveedorCompControl.valueChanges.pipe(
      map(value => this._filterProveedor(value || ''))
    );
  }

  private _filterProveedor(proveedor:string): Proveedor[] {
    console.log("Filtrando unidades", proveedor);
    const filterValue = proveedor.toLowerCase();

    return this.proovedores.filter(option => option.cardName.toLowerCase().includes(filterValue));
  }

  private _filter(unidad:string): Unidad[] {
    console.log("Filtrando unidades", unidad);
    const filterValue = unidad.toLowerCase();

    return this.unidades.filter(option => option.itemname.toLowerCase().includes(filterValue));
  }

  

  clearFields():void {
    
    this.latestVales=[];
    this.creando = false;
    this.comentariosBox="";
    this.stockAutoabasto="";
    this.odometroInicial=0;
    this.litrosSolicitados=0;
  
    this.isProveedorDisabled = true;
  
    this.request = {
      empresa:0,
      objType:0,
      DocumentLines:[],
      valeDataInfo:null,
      Comments:""
    };
  
    this.oCRequest = {
      empresa:0,
      objType:0,
      Comments:"",
      DocumentLines:[],
      valeDataInfo:null
    };
  
    this.valeDataInfo = {
      operador_Name:"",
      unidad_Code:"String",
      unidad_Name: "String",
      km_Inicial:0,
      rendimiento_Optimo:0,
      proveedor:"",
      usuario:"",
      sucursal:"",
      tanqueLLeno:"No"
    };
  
    this.selectedOperador = undefined;
    this.selectedUnidad  = {
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
    this.selectedProovedor= undefined;
    this.selectedDieselCode= undefined;
    this.quantityRequested = 0;
  
    
    
    this.empresaSelected = undefined;
    this.tipoVale = "";
    this.codigoDiesel=[];
    this.rendimientoOptimo=0;

    this.quantityRequested=0;
    this.odometroInicial=0;
    this.litrosSolicitados=0;
    this.getUnidades();
  }

  getEmpresas():void {
    this.databaseInfoService.getDataBaseInfo().subscribe(empresas => {this.empresas = empresas;});
  }

  confirmDifferentCompanyForUnit() {
    var empresa = this.empresas.find((empresa)=>{
      if(empresa.id==this.empresaSelected) return true;
      else return false;
    });
    console.log("eee",empresa);
    if(this.selectedUnidad.empresa!=empresa?.name) {
      const dialogRef = this.dialog.open(ConfirmComponent, {
        width: '550px',
        data: "Este activo "+ this.selectedUnidad.itemcode + " pertenece a la empresa "+ this.selectedUnidad.empresa +" Deseas continuar?"
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        if(result){
          this.changeCompany();
        } else {
          
        }
        
      });
    } else {
      this.changeCompany();
    }
  }

  changeCompany():void {
    this.tipoVale="";
    this.selectedVoucher=undefined;
    console.log("empresaa",this.empresaSelected);
    if(this.empresaSelected != 3) {
      this.tipoVale="OC";
      this.getCodigoDiesel();
      this.getProveedores();
      this.isProveedorDisabled=false;
    }

  }

  changeVoucherType():void {
    this.request.objType = this.selectedVoucher == undefined ?  0:this.selectedVoucher.type;
    if(this.selectedVoucher?.name=="AA") {
      this.tipoVale="AA";
      this.isProveedorDisabled=true;
      this.getCodigoDiesel();
      this.getStock();
    } else {
      console.log("orden compra selected");
      this.tipoVale="OC";
      this.getProveedores();
      this.getCodigoDiesel();
      this.isProveedorDisabled=false;
    }

    console.log(this.request);
  }
  
  getStock(): void {
    if(undefined!= this.empresaSelected) {
    this.stockService.getStock(this.empresaSelected.toString()).subscribe(stock=>this.stockAutoabasto=stock.stock.toString());
    }
  }

  getCodigoDiesel():void {
    if(undefined!= this.empresaSelected){
      this.codigoDieselService.getCodigosDiesel(this.empresaSelected.toString(),this.tipoVale).subscribe(codigos => this.codigoDiesel=codigos);
    }
  }

  getOperadores():void {
    this.operadorService.getOperadores().subscribe(operadores=>this.operadores = operadores);
  }

  getUnidades():void {
    this.unidadService.getUnidades().subscribe(unidades=>this.unidades = unidades);
  }

  getProveedores():void {
    console.log("obteniendo proveedores: ", this.empresaSelected);
    if(undefined!= this.empresaSelected) {
      this.proveedorService.getProovedores(this.empresaSelected.toString()).subscribe(proovedores=>{
        this.proovedores = proovedores;
        this.selectedProovedor=undefined;
        this.proveedorCompControl.reset('');
        this.addProveedoresFilter();
        console.log("proveedotes list: ",this.proovedores);
      });
    }
  }

  changeOperadorName():void {
    this.valeDataInfo.operador_Name = this.selectedOperador == undefined ?  "":this.selectedOperador.name;
    console.log(this.valeDataInfo);
  }

  onUpdatedComments(even:any): void {
    this.comentariosBox = even.target.value;
  }

  onUpdateBombaInicial(event:any): void {
    this.valeDataInfoAutoAbasto.Lbomba_Inicial = +event.target.value;
  }

  getOptionTextUnidades(option:any) {
    return option.itemname;
  }

  selectUnidadOption(event:any): void {
    this.selectedUnidad=event.option.value;
    this.changeUnidad();
    this.addUnidadFilter();
  }

  getOptionTextProveedor(option:any) {
    return option.cardName;
  }

  selectProveedorOption(event:any): void {
    this.selectedProovedor=event.option.value;
    this.valeDataInfo.proveedor = this.selectedProovedor == undefined ?  "":this.selectedProovedor.cardCode;
    this.addProveedoresFilter();
  }

  changeUnidad():void {
    this.valeDataInfo.unidad_Name = this.selectedUnidad == undefined ?  "":this.selectedUnidad.itemname;
    this.valeDataInfo.unidad_Code = this.selectedUnidad == undefined ? "":this.selectedUnidad.itemcode;
    this.valeDataInfo.rendimiento_Optimo = this.selectedUnidad == undefined ? 0:this.selectedUnidad.rendimiento;
    this.rendimientoOptimo = this.valeDataInfo.rendimiento_Optimo;
    this.odometroInicial=this.selectedUnidad.odometro_Final;
     

    console.log("Unidad",this.selectedUnidad);
    this.valesService.getValesByUnidadTop5(this.valeDataInfo.unidad_Code).subscribe(latestVales=>{
      this.latestVales = latestVales; console.log(latestVales);
    });

    console.log(this.valeDataInfo);
  }

  kmInicialUpdated(event:any):void {
    this.valeDataInfo.km_Inicial=Number.parseFloat(event.target.value);
   
    if(this.selectedUnidad.isHrs.includes("Y")) { 
      this.litrosSolicitados=(this.valeDataInfo.km_Inicial-this.selectedUnidad.odometro_Final)*this.selectedUnidad.rendimiento;
    } else {
      this.litrosSolicitados=(this.valeDataInfo.km_Inicial-this.selectedUnidad.odometro_Final)/this.selectedUnidad.rendimiento;
    }
    
      
    this.quantityRequested=this.litrosSolicitados;
    this.litrosSolicitadosControl.setErrors(null);
  }

  onChangeTanqueLleno(event:any) :void {
    if(event){
      this.valeDataInfo.tanqueLLeno="Si";
      this.valeDataInfoAutoAbasto.tanqueLLeno="Si";
    } else {
      this.valeDataInfo.tanqueLLeno="No";
      this.valeDataInfoAutoAbasto.tanqueLLeno="No";
    }
  }

  kmRendimientoOptimoUpdated(event:any):void {
    this.valeDataInfo.rendimiento_Optimo=Number.parseFloat(event.target.value);
  }

  changeProovedor():void {
    this.valeDataInfo.proveedor = this.selectedProovedor == undefined ?  "":this.selectedProovedor.cardCode;

    console.log(this.valeDataInfo);
  }

  sucursalUpdated(event:any):void {
    
    this.valeDataInfo.sucursal=event.target.value;
    console.log(this.valeDataInfo);
  }

  litrosUpdated(event:any):void {
    this.quantityRequested = event.target.value;
  }

  operadorUpdated(event:any):void {
    this.valeDataInfo.operador_Name=event.target.value;
  }

  fieldsWithErrors(): boolean {
    var proovedorError = false;
    var numeric = (this.litrosSolicitadosControl.getError('required') || this.litrosSolicitadosControl.getError('pattern') || 
    this.kmInicialControl.getError('required') || this.kmInicialControl.getError('pattern'));

    if(!this.isProveedorDisabled)
      proovedorError = this.proveedorCompControl.getError('required');


      console.log("errors",numeric, proovedorError );
    return numeric || proovedorError;
  }

  openDialog(): void {
    if(this.fieldsWithErrors()) {
      this.snackBar.open("Algunos campos son requeridos o tienen error favor de verificar");
      return;
    }
    

    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '250px',
      data: "Estas seguro de crear este vale?"
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if(result){
        this.canCreate=true;
        this.sendRequest();
      } else {
        this.canCreate=false;
      }
      console.log("Can create?: ",this.canCreate);
    });
  }

  

  sendRequest():void {
    console.log("Sending request...");
    var createdVale!: Vale;
    var objType = 0;
    this.creando=true;
    this.valeDataInfoAutoAbasto.usuario = this.valeDataInfo.usuario = localStorage.getItem("userName")?.toString()!;
    this.valeDataInfoAutoAbasto.operador_Name = this.valeDataInfo.operador_Name=this.selectedUnidad.operador;
    this.valeDataInfoAutoAbasto.sucursal = this.valeDataInfo.sucursal=this.selectedUnidad.sucursal;
    this.valeDataInfoAutoAbasto.rendimiento_Optimo = this.valeDataInfo.rendimiento_Optimo=this.selectedUnidad.rendimiento;
    this.documentLine= {
      ItemCode:this.codigoDiesel[0].itemcode,
      Quantity:Number.parseFloat(this.quantityRequested.toString())
    }
    if(this.tipoVale == "AA") {
    this.valeDataInfoAutoAbasto.unidad_Code = this.valeDataInfo.unidad_Code;
    this.valeDataInfoAutoAbasto.unidad_Name = this.valeDataInfo.unidad_Name;
    this.valeDataInfoAutoAbasto.km_Inicial = this.valeDataInfo.km_Inicial;
    this.valeDataInfoAutoAbasto.proveedor="";
		console.log("Creando autoabasto");
      objType = 60;
      this.request = {
        empresa:this.empresaSelected,
        objType:objType,
        DocumentLines:[this.documentLine],
        valeDataInfo: this.valeDataInfoAutoAbasto,
        Comments: this.comentariosBox,
      }

      console.log(this.request);
      this.slService.createVale(this.request).subscribe((response)=>{
        console.log("response:",response);
        if(response.unidad_Code==this.request.valeDataInfo?.unidad_Code){
          this.creando=false;
          createdVale=response;
          this.changeUnidad();
          this.clearFields();
        }
      }, (error)=>{
        console.log("Error: ", error);
        this.snackBar.open("Error code: " +error.status + "\nMensaje de error: " + error.error.Message,  "Cerrar")

        this.creando=false;
        
      });

    } else {
      objType = 22;
      console.log("Creando orden de compra");
      this.oCRequest = {
        empresa:this.empresaSelected,
        objType:objType,
        Comments:this.comentariosBox,
        DocumentLines:[this.documentLine],
        valeDataInfo: this.valeDataInfo
  
      }
      console.log(this.oCRequest);
      this.slService.createVale(this.oCRequest).subscribe((response)=>{
        console.log("response:",response);
        if(response.proveedor==this.oCRequest.valeDataInfo?.proveedor){
          
          this.creando=false;
          createdVale=response;
          this.changeUnidad();
          this.clearFields();
            
        }
      }, (error)=> {
        console.log("Error: ", error);
        this.snackBar.open("Error creando el vale, Error code: " +error.status + "Mensaje de error: " + error.error.Message,  "Cerrar")
        this.creando=false;
        
      });
    }
    
    
  }

  back(): void {
    this.location.back()
}

}
