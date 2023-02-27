import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private _router: Router, private location: Location) { }

  GENERAL_TITLE="Portal de control";
  GAS_CONTROL_TITLE="Control de combustible";
  WORK_ORDERS_TITLE="Control de mantenimientos";


  homeActive:boolean=true;
  valesActive:boolean=false;
  unidadesActive:boolean=false;
  workOrdersActive:boolean=false;
  laborActive:boolean=false;
  moduleTitle:String=this.GENERAL_TITLE;

  ngOnInit(): void {
  }

  isAuthenticated():boolean {
    var user = localStorage.getItem("userName");
    if(user!=undefined && user.length>0)
      return true
    return false;
  }

  cerrarSesion() {
    localStorage.removeItem("userName");
    window.location.href="users/login"
  }

  onHome(): void {
    this.homeActive=true;
    this.valesActive=false;
    this.unidadesActive=false;
    this.workOrdersActive=false;
    this.moduleTitle=this.GENERAL_TITLE;

    this._router.navigate(['/']);
  }

  onVales(): void {
    this.homeActive=false;
    this.valesActive=true;
    this.unidadesActive=false;
    this.workOrdersActive=false;
    this.laborActive=false;
    this.moduleTitle=this.GAS_CONTROL_TITLE;

    this._router.navigate(['/vales/']);
  }

  onUnidades(): void {
    this.homeActive=false;
    this.valesActive=false;
    this.unidadesActive=true;
    this.workOrdersActive=false;
    this.laborActive=false;
    this.moduleTitle=this.GAS_CONTROL_TITLE;


    this._router.navigate(['/unidades/']);
  }

  onWorkOrders(): void {
    this.homeActive=false;
    this.valesActive=false;
    this.unidadesActive=false;
    this.workOrdersActive=true;
    this.laborActive=false;

    this.moduleTitle=this.WORK_ORDERS_TITLE;


    this._router.navigate(['/work-orders/']);
  }

  onLabor(): void {
    this.homeActive=false;
    this.valesActive=false;
    this.unidadesActive=false;
    this.workOrdersActive=false;
    this.laborActive=true;

    this.moduleTitle=this.WORK_ORDERS_TITLE;


    this._router.navigate(['/labor/']);
  }

  back(): void {
    this.location.back()
  }

}
