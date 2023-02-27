import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Unidad } from 'src/app/Models/Unidad';
import { TableUtil } from 'src/app/services/TableUtil';
import { UnidadService } from 'src/app/services/unidad.service';

@Component({
  selector: 'app-view-unidades',
  templateUrl: './view-unidades.component.html',
  styleUrls: ['./view-unidades.component.css']
})
export class ViewUnidadesComponent implements OnInit {

  unidades!:Unidad[];
  filteredUnits!:Unidad[];
  dataSource!:MatTableDataSource<Unidad>;
  unitName!:String;


  loading:Boolean=false;

  displayedColumns: string[] = ['No.','itemname', 'itemcode','Tipo','Operador','Telefono','Sucursal', 'odometro_Final','rendimiento_Anterior', 'rendimiento', 'empresa', 'nombreEmpresa'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;



  constructor(private unidadService: UnidadService, private _liveAnnouncer: LiveAnnouncer) { }

  ngOnInit(): void {
    this.loading=true;
    this.unidadService.getUnidades().subscribe((unidades)=>{
      this.unidades=unidades.filter((unidad)=>{if (unidad.acom=="N") return true; else return false;});
      this.filteredUnits=this.unidades;
      this.dataSource = new MatTableDataSource<Unidad>(this.filteredUnits);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort=this.sort;
      this.loading=false;
    });
  }

  selectRow(row:any): void {
    window.location.href="unidades/vales/"+row.itemcode;
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
    TableUtil.exportArrayToExcel(this.filteredUnits);
  }


  onFilterChange(event:any): void {
    this.filter();
  }

  filter(): void {
    if(this.unitName==undefined || this.unitName.trim().length==0 ) {
      console.log("Original filter");
      this.filteredUnits=this.unidades;
    } else {
      console.log("Filtering");
      this.filteredUnits = this.unidades.filter((unidad)=>{
        return (unidad.itemname.toLowerCase().includes(this.unitName.toString().toLowerCase()) || unidad.itemcode.toLowerCase().includes(this.unitName.toString().toLowerCase())||
        unidad.operador.toLowerCase().includes(this.unitName.toString().toLowerCase()) || unidad.tipo.toLowerCase().includes(this.unitName.toString().toLowerCase()) ||
        unidad.telefono.replace(/\s/g, "").includes(this.unitName.toString()) || unidad.empresa.toLowerCase().includes(this.unitName.toString().toLowerCase()) || 
        unidad.sucursal.toLowerCase().includes(this.unitName.toString().toLowerCase()) || unidad.nombreEmpresa.toLowerCase().includes(this.unitName.toString().toLowerCase()));
      });
      console.log(this.filteredUnits);
    } 
    
    this.dataSource = new MatTableDataSource<Unidad>(this.filteredUnits);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort=this.sort;
  }

}
