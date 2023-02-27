import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Vale } from 'src/app/Models/Vale';
import { ValeService } from 'src/app/vale.service';
import { ViewHistoryComponent } from '../../vales/view-history/view-history.component';

@Component({
  selector: 'app-view-unidad',
  templateUrl: './view-unidad.component.html',
  styleUrls: ['./view-unidad.component.css'],
})
export class ViewUnidadComponent implements OnInit {

  unidadCode!:String;
  vales!:Vale[];

  constructor(private route:ActivatedRoute, private valeService: ValeService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.unidadCode = params['code']; 
      this.getVales();
   });
  }

  getVales(): void {
    this.valeService.getValesByUnidad(this.unidadCode).subscribe((vales)=>{
      this.vales=vales;
    });
  }

}
