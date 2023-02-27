import { AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { FloatLabelType } from '@angular/material/form-field';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { DatabaseInfo } from 'src/app/Models/DatabaseInfo';
import { FileRequest } from 'src/app/Models/FileRequest';
import { FileResponse } from 'src/app/Models/FileResponse';
import { Vale } from 'src/app/Models/Vale';
import { DatabaseInfoService } from 'src/app/services/database-info.service';
import { SLServiceService } from 'src/app/services/slservice.service';
import { ValeService } from 'src/app/vale.service';

@Component({
  selector: 'app-edit-vale',
  templateUrl: './edit-vale.component.html',
  styleUrls: ['./edit-vale.component.css'],
  providers: [MatSnackBar]
})
export class EditValeComponent implements OnInit, AfterViewChecked{

  id!:number;
  vale!:Vale;
  creando:boolean=false;
  commentsBox!:String;
  editedQuantity!:number;
  editedFinalKm!:number;
  file!:FileResponse;
  tanqueLleno!:boolean;

  fileRequest: FileRequest = {
    empresa:-1,
    keySAPid:-1,
    fileName:"",
    file64:""
  };

  empresas!: DatabaseInfo[];

  hideRequiredControl = new FormControl(true);
  floatLabelControl = new FormControl('auto' as FloatLabelType);
  options = this._formBuilder.group({
    hideRequired: this.hideRequiredControl,
    floatLabel: this.floatLabelControl,
  });



  constructor(private route: ActivatedRoute, private valeService: ValeService, private _formBuilder: FormBuilder, private slService: SLServiceService,
    private snackbar: MatSnackBar, private dbInfoService: DatabaseInfoService) { }
  ngAfterViewChecked(): void {
    
  }

  getFloatLabelValue(): FloatLabelType {
    return this.floatLabelControl.value || 'auto';
  }

  ngOnInit(): void {
    this.getEmpresas();
    this.route.params.subscribe(params => {
      this.id = +params['id']; 
      this.getVale();
   });
   
  }

  getFileIfExist(): void{
    this.valeService.getFile(this.findIdEmpresaByName(this.vale.empresa).toString(),this.vale.keySAPid.toString()).subscribe((response)=>{
      if(response.length>0)
        this.file=response[0];
      else 
        this.file=undefined!;
      console.log(this.file);
    }, (error)=>{
      this.snackbar.open("Error obteniend el archivo adjunto, Error code: " +error.status + "Mensaje de error: " + error.error.Message,  "Cerrar")
      this.file=undefined!;
    });
  }

  getEmpresas(): void {
    this.dbInfoService.getDataBaseInfo().subscribe(empresas=>{
      this.empresas=empresas;
    });

  }

  findIdEmpresaByName(name:String): number {
    var empresa;
    empresa = this.empresas.find((empresa)=>{
      if(empresa.name.includes(name.toString())) return true;
      else return false;
    });
    var id = empresa?.id!;
    console.log("Empresa Id para el archivo: ", id);
    return id;
    
  }

  getVale(): void {
    this.valeService.getValeById(this.id).subscribe(vale=>{
      this.vale=vale;
      this.editedQuantity=this.vale.litrosCargados;
      this.editedFinalKm=this.vale.km_Final;
      this.commentsBox=this.vale.comentarios;
      if(this.vale.tanqueLLeno.toLowerCase().includes("si")){
        this.tanqueLleno=true;
      }
      else this.tanqueLleno=false;
      
    })
  }

  onUpdatedComments(event:any): void {
    this.commentsBox  =event.target.value;
  }

  kmFinalUpdated(event:any): void {
    this.editedFinalKm = Number.parseFloat(event.target.value);
  }

  litrosUpdated(event:any): void {
    this.editedQuantity = Number.parseFloat(event.target.value);
  }

  handleUpload(event:any) {
    const file = event.target.files[0];
    this.fileRequest.fileName=file.name.split('.')[0];
    this.fileRequest.empresa=this.findIdEmpresaByName(this.vale.empresa);
    this.fileRequest.keySAPid=this.vale.keySAPid;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      var content = reader.result?.toString();
      var base64result = content?.split(',')[1];
      this.fileRequest.file64=base64result!;
    };
  }

  onChangeTanqueLleno(event:any) :void {
    if(event){
      this.vale.tanqueLLeno="Si";
    } else {
      this.vale.tanqueLLeno="No";
    }
  }

  sendFileRequest() : void {
    this.creando=true;
    console.log("file request:", this.fileRequest);
    this.valeService.uploadFile(this.fileRequest).subscribe((success)=>{
      this.creando=false;
    }, (error)=>{
      this.creando=false;
      this.snackbar.open("Error subiendo archivo, Error code: " +error.status + "Mensaje de error: " + error.error.Message,  "Cerrar")
    })
  }

  sendRequest() : void {
    
    let request= {
      empresa:0,
      objType:this.vale.type,
      Comments:this.commentsBox,
      DocumentLines: [{
        ItemCode:"",
        Quantity:this.editedQuantity
      }],
      valeDataInfo: {
        idVale: this.vale.id,
        operador_Name:this.vale.operador_Name,
        unidad_Code:this.vale.unidad_Code,
        unidad_Name:this.vale.unidad_Name,
        km_Final:this.editedFinalKm,
        rendimiento_Optimo:this.vale.rendimiento_Optimo,
        proveedor:this.vale.proveedorName,
        usuario:this.vale.usuario,
        sucursal:this.vale.sucursal,
        tanqueLLeno: this.vale.tanqueLLeno
      }
    }

    console.log(request);
    this.slService.updateVale(request).subscribe((response)=> {
      window.location.href="vales/view/"+this.vale.id
    }, error =>{
      this.snackbar.open("Error code: " +error.status + "Mensaje de error: " + error.error.Message,  "Cerrar")
    });

  }

 

}
