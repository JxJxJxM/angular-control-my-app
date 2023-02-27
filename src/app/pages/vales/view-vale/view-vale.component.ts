import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Vale } from 'src/app/Models/Vale';
import { SLServiceService } from 'src/app/services/slservice.service';
import { ValeService } from 'src/app/vale.service';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common'
import { DatabaseInfo } from 'src/app/Models/DatabaseInfo';
import { FileRequest } from 'src/app/Models/FileRequest';
import { FileResponse } from 'src/app/Models/FileResponse';
import { DatabaseInfoService } from 'src/app/services/database-info.service';


@Component({
  selector: 'app-view-vale',
  templateUrl: './view-vale.component.html',
  styleUrls: ['./view-vale.component.css'],
  providers: [MatSnackBar]
})
export class ViewValeComponent implements OnInit {

  constructor(private route: ActivatedRoute, private valeService:ValeService, private sLService: SLServiceService, 
    private snackBar: MatSnackBar, private router: Router, private location: Location, private snackbar: MatSnackBar,
    private dbInfoService: DatabaseInfoService) {
     }
  id!:Number;
  vale!:Vale;
  valeDate!:Date;
  baseUrl = environment.reportsServiceBaseUrl;

  pdfUrl = this.baseUrl + "Home/PDFVale?idVale=";
  fileUrl = environment.sapServiceBaseUrl + "api/SL/GetFile?empresa=";
  private history: string[] = []
  creando:boolean=false;
  tanqueLleno!:boolean;



  file!:FileResponse;

  fileRequest: FileRequest = {
    empresa:-1,
    keySAPid:-1,
    fileName:"",
    file64:""
  };

  empresas!: DatabaseInfo[];
  


  ngOnInit(): void {
    this.getEmpresas();
    this.route.params.subscribe(params => {
      this.id = +params['id']; 
      this.getVale();
   });
  }

  getVale(): void {
    this.valeService.getValeById(this.id).subscribe((vale)=>{
      this.vale = vale; console.log(vale);
      this.valeDate = new Date(vale.timestamp.toString());
      if(this.vale.tanqueLLeno.toLowerCase().includes("si")){
        this.tanqueLleno=true;
      }
      else this.tanqueLleno=false;
      this.getFileIfExist();
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

  openFile(): void{
    window.open(this.fileUrl+this.findIdEmpresaByName(this.vale.empresa).toString()+"&KeySapId="+this.vale.keySAPid.toString());
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

  handleUpload(event:any) {
    const file = event.target.files[0];
    this.fileRequest.fileName=file.name;
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

  printVoucher(): void {
    window.open(this.pdfUrl+this.id+"&tipo="+this.vale.type);
  }

  requestedLitersUpdated(event:any): void {
    this.vale.litrosCargados=Number.parseFloat(event.target.value);
  }

  startKmUpdated(event:any): void {
    this.vale.km_Inicial = Number.parseFloat(event.target.value);
  }

  finalKmUpdated(event:any): void {
    this.vale.km_Final = Number.parseFloat(event.target.value);
  }

  commentsUpdated(event:any): void {
    this.vale.comentarios=event.target.vale;
  }


  confirmVoucher(): void {
    var request =
      {
        empresa:3,
        objType:60, 

       DocumentLines:[{
           ItemCode:"DL",
           Quantity:this.vale.litrosCargados
    
       }],
        valeDataInfo  : {
            idVale:this.vale.id,
            operador_Name: this.vale.operador_Name,
            unidad_Code: this.vale.unidad_Code,
            unidad_Name: this.vale.unidad_Name,
            km_Final: this.vale.km_Final,
            rendimiento_Optimo: this.vale.rendimiento_Optimo,
            proveedor: this.vale.proveedor,
            usuario: this.vale.usuario,
            sucursal: this.vale.sucursal,
            Lbomba_Inicial: this.vale.lbomba_Inicial,
            tanqueLLeno: this.vale.tanqueLLeno
            
        }
    }

    console.log("REQUEST", request);

    this.sLService.confirmVale(request).subscribe(response=>{
      if(response.status=='F')
      {
       this.getVale(); 
      }
    }, error => {
      this.snackBar.open("Error code: " +error.status + "Mensaje de error: " + error.error.Message,  "Cerrar")
    }
    );
  }

  sendFileRequest() : void {
    this.creando=true;
    console.log("file request:", this.fileRequest);
    this.valeService.uploadFile(this.fileRequest).subscribe((success)=>{
      this.creando=false;
      this.getVale();
    }, (error)=>{
      this.creando=false;
      this.snackbar.open("Error subiendo archivo, Error code: " +error.status + "Mensaje de error: " + error.error.Message,  "Cerrar");
    })
  }

  back(): void {
      this.location.back()
  }
  

}
