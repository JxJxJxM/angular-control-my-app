import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Vale } from 'src/app/Models/Vale';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-view-quick-history',
  templateUrl: './view-quick-history.component.html',
  styleUrls: ['./view-quick-history.component.css']
})
export class ViewQuickHistoryComponent implements OnInit {

  baseUrl = environment.reportsServiceBaseUrl;
  pdfUrl = this.baseUrl + "Home/PDFVale?idVale=";

  displayedColumns: string[] = ['Id','Fecha', 'Operador', 'Unidad', 'Km final', 'Litros cargados', 'Rendimiento',
                                'Empresa', 'Acciones'];
  
  loading:boolean = false;

  constructor() { 
    
  }

  @Input() vales!: Vale[];


  

  ngAfterViewInit() {
    
  }


  ngOnInit(): void {
    this.loading=false;
  }

  selectRow(row:any): void {
    window.location.href="vales/view/"+row.id;
  }

  editVale(row:any) : void {
    window.location.href="vales/edit/"+row.id
  }

  printVale(row:any): void {
    window.open(this.pdfUrl+row.id+"&tipo="+row.type);
  }

} 
