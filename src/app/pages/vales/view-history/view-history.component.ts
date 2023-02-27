import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { waitForAsync } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NavigationEnd, Router } from '@angular/router';
import { DatabaseInfo } from 'src/app/Models/DatabaseInfo';
import { Vale } from 'src/app/Models/Vale';
import { ValeExtended } from 'src/app/Models/ValeExtended';
import { DatabaseInfoService } from 'src/app/services/database-info.service';
import { TableUtil } from 'src/app/services/TableUtil';
import { ValeService } from 'src/app/vale.service';
import { environment } from 'src/environments/environment';
import { ConfirmComponent } from '../../modales/confirm/confirm.component';

@Component({
  selector: 'app-view-history',
  templateUrl: './view-history.component.html',
  styleUrls: ['./view-history.component.css'],
  providers: [MatDialog, MatSnackBar]
})
export class ViewHistoryComponent implements OnInit, AfterViewInit{

  baseUrl = environment.reportsServiceBaseUrl;
  pdfUrl = this.baseUrl + "Home/PDFVale?idVale=";
  fileUrl = environment.sapServiceBaseUrl + "api/SL/GetFile?empresa=";

  displayedColumns: string[] = ['Id','Id SAP','Fecha', 'Operador', 'Unidad', 'Sucursal' ,'Km Final', 'Km Recorridos' ,'Litros cargados','Tanque lleno', 'Rendimiento real','Diferencia', 'Empresa', 'Acciones'];
  vales!:Vale[];
  filteredVales!:Vale[];
  dataSource!:MatTableDataSource<Vale>;
  unitName!:String;
  sucursalName!:String;
  filters!:[];
  lastVouchers!:[];
  filterByPending=false;
  filterByFullTank=false;
  voucherTypes= [
    {value: 1, viewValue: 'Todos'},
    {value: 60, viewValue: 'Auto abasto'},
    {value: 22, viewValue: 'Orden de compra'}
  ];
  voucherTypeFilter = 1;
  empresas!: DatabaseInfo[];



  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });


  constructor(private valesService:ValeService, private _liveAnnouncer: LiveAnnouncer, private router: Router, public dialog: MatDialog, private snackBar: MatSnackBar,
    private dbInfoService: DatabaseInfoService) { 
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        console.log("redirect", event);
        
      }
    });
    this.getEmpresas();
  }
  


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  
  @Input() valesFromParent!: Vale[];

  ngAfterViewInit() {

    //obtener todas las unidades primero luego los vales de esas unidades y luego recorrer la otra y ponerle  

    var valesExtended: ValeExtended[];
    if(this.valesFromParent != undefined) {
      this.vales=this.valesFromParent;
      this.filteredVales = this.valesFromParent;
      this.dataSource = new MatTableDataSource<Vale>(this.filteredVales);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    } else {
      this.valesService.getVales().subscribe((vales) => {
        this.vales=vales;
        this.filteredVales=vales;
        this.dataSource = new MatTableDataSource<Vale>(this.filteredVales);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

      });
    }
  }


  ngOnInit(): void {
      
    
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

  createVale(): void {
    window.location.href="vales/create"
  }

  exportTable() {
    //TableUtil.exportTableToExcel("ExampleMaterialTable");
    TableUtil.exportArrayToExcel(this.filteredVales);
  }


  /*

  isTheLastVoucher(voucher:Vale): boolean {
    var last=false;
    var vouchersByUnit!:Vale[];
    this.valesService.getValesByUnidadTop5(voucher.unidad_Code).subscribe(vales=>{
      vouchersByUnit=vales;
      const arr1 = vouchersByUnit.map((obj) => {
        return { ...obj, date: new Date(obj.timestamp.toString()) };
      });
      console.log("maped", arr1);
      const sortedAsc = arr1.sort(
        (objA, objB) => objA.date.getTime() - objB.date.getTime(),
      );
  
      console.log(sortedAsc);
      return last;
    });
    
  }*/


  getEmpresas(): void {
    this.dbInfoService.getDataBaseInfo().subscribe(empresas=>{
      this.empresas=empresas;
    });

  }

  onChangeVoucherTypeFilter(event: any): void {
    this.voucherTypeFilter=event.value;
    this.filterVales();
  }

  filterByVoucherType(): void {
    console.log("tye selected", this.voucherTypeFilter);
    if(this.voucherTypeFilter!=1) {
      console.log("filtering by type ");
      this.filteredVales = this.filteredVales.filter((vale)=>{
        return vale.type==this.voucherTypeFilter;
      });
      console.log(this.filteredVales);
    } else {
      console.log("returning");
      this.filteredVales=this.filteredVales;
    }
  }

  filterByDateRange(): void {
    if(this.range.value.start!=undefined&&this.range.value.end!=undefined){
      let startDate = this.range.value.start;
      let endDate = this.range.value.end;
      this.filteredVales = this.filteredVales.filter((vale)=>{
        let voucherDate = new Date(vale.timestamp.toString());
        voucherDate = new Date(voucherDate.toDateString());
        if(voucherDate>=startDate && voucherDate<=endDate){
          
          return true;
        } else {return false;}
      })
    }
    if(this.range.value.start==undefined || this.range.value.end==undefined){
      console.log("Revirtiendo filtro fecha");
      this.filteredVales = this.filteredVales;
    }
    
  }

  filterBySucursal(): void {
    console.log("filtrando por sucursal", this.sucursalName);
    if(this.sucursalName==undefined || this.sucursalName.trim().length==0 ) {
      console.log("Original filter");
      this.filteredVales=this.filteredVales;
    
    } else {
      console.log("Filtering by", this.sucursalName);
      this.filteredVales = this.filteredVales.filter((vale)=>{
        return vale.sucursal.toLowerCase().includes(this.sucursalName.toString().toLowerCase()); 
      });
      console.log(this.filteredVales);
    } 

  }

  filterByUnit(): void {
    console.log("filtrando por unidad", this.unitName);
    if(this.unitName==undefined || this.unitName.trim().length==0 ) {
      console.log("Original filter");
      this.filteredVales=this.vales;
    
    } else {
      console.log("Filtering by", this.unitName);
      this.filteredVales = this.vales.filter((vale)=>{
        return (vale.unidad_Name.toLowerCase().includes(this.unitName.toString().toLowerCase()) || vale.operador_Name.toLowerCase().includes(this.unitName.toString().toLowerCase())
        || vale.empresa.toLowerCase().includes(this.unitName.toString().toLowerCase()) || vale.timestamp.toLowerCase().includes(this.unitName.toString().toLowerCase())
        || vale.idSAP.toString().includes(this.unitName.toString()) || vale.id.toString().includes(this.unitName.toString()) 
        );
      });
      console.log(this.filteredVales);
    } 
    
    
  }

  onChangeCheckTanqueLleno(filter:boolean){
    this.filterByFullTank=filter;
    this.filterVales();
  }

  onChangeCheckPendigVouchers(filter:boolean){
    this.filterByPending=filter;
    this.filterVales();
  }

  filterVales(): void {
    this.filterByUnit();
    
    this.filterBySucursal();

    this.filterByPendingVouchers(this.filterByPending);

    this.filterByTanqueLleno(this.filterByFullTank);

    this.filterByDateRange();

    this.filterByVoucherType();
    

    //datasource para la lista
    this.dataSource = new MatTableDataSource<Vale>(this.filteredVales);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort=this.sort;
  }

  filterByPendingVouchers(filering: boolean): void {
    if(filering) {
      console.log("filtering by status");
      this.filteredVales = this.filteredVales.filter((vale)=>{
        console.log("status ", vale.status);
        return vale.status.toLowerCase().includes("p");
      });
      console.log(this.filteredVales);
    } else {
      this.filteredVales=this.filteredVales;
    }
  }

  filterByTanqueLleno(filering: boolean): void {
    if(filering) {
      console.log("filtering by tanque lleno");
      this.filteredVales = this.filteredVales.filter((vale)=>{
        return vale.tanqueLLeno?.toLowerCase().includes("si");
      });
      console.log(this.filteredVales);
    } else {
     
      this.filteredVales=this.filteredVales;
    }
  }

  selectRow(row:any): void {
    console.log('navigate');
    this.router.navigate(['vales/view/'+row.id]);
    
  }

  editVale(row:any) : void {
    window.location.href="vales/edit/"+row.id
  }

  confirmDeleteVale(row:any) : void {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '250px',
      data: "Estas seguro de cancelar este vale?"
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if(result){
        this.deleteVale(row);
      }
    });
  }

  deleteVale(row:any) : void {
    this.valesService.deleteVale(row.id).subscribe((response)=>{
      console.log(response);
      this.snackBar.open("Vale cancelado correctamente");
      this.ngAfterViewInit();
      this.filterVales();
    }, (error)=>{
      console.log("Error cancelar vale: ",error);
      this.snackBar.open("Error cancelando el vale, Error code: " +error.status + "Mensaje de error: " + error.error.Message,  "Cerrar")
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


  printVale(row:any): void {
    window.open(this.pdfUrl+row.id+"&tipo="+row.type);
  }

  openFile(row:Vale): void{
    console.log(this.fileUrl+this.findIdEmpresaByName(row.empresa).toString()+"&KeySapId="+row.keySAPid.toString());
    window.open(this.fileUrl+this.findIdEmpresaByName(row.empresa).toString()+"&KeySapId="+row.keySAPid.toString());
  }

}
