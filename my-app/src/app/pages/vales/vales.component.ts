import { Component, OnInit } from '@angular/core';
import { Vale } from 'src/app/Models/Vale';
import { ValeService } from 'src/app/vale.service';


@Component({
  selector: 'app-vales',
  templateUrl: './vales.component.html',
  styleUrls: ['./vales.component.css']
})
export class ValesComponent implements OnInit {

  displayedColumns: string[] = ['Fecha', 'Operador', 'Unidad', 
                                'Litros cargados', 'Rendimiento real', 'Proveedor', 'Usuario','Empresa', 'Sucursal'];
  dataSource: Vale[] = [];
  loading:boolean = true;

  constructor(private valesService: ValeService) { }


  ngOnInit(): void {
    this.loading=true;
    this.getVales();
  }

  getVales(): void {
    
    this.valesService.getVales().subscribe(vales => {this.dataSource = vales; this.loading=false;});;
  }
}
