import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UnidadesRoutingModule } from './unidades-routing.module';
import { UnidadesComponent } from './unidades.component';
import { ViewUnidadesComponent } from './view-unidades/view-unidades.component';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { ViewUnidadComponent } from './view-unidad/view-unidad.component';
import { ValesModule } from '../vales/vales.module';
import { ViewValeComponent } from '../vales/view-vale/view-vale.component';
import { MatSortModule } from '@angular/material/sort';


@NgModule({
  declarations: [
    UnidadesComponent,
    ViewUnidadesComponent,
    ViewUnidadComponent,
  ],
  imports: [
    CommonModule,
    UnidadesRoutingModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatInputModule,
    MatButtonModule,
    MatGridListModule,
    MatCardModule,
    MatPaginatorModule,
    ValesModule,
    MatSortModule
  ],
  bootstrap:[UnidadesModule]
})
export class UnidadesModule { }
