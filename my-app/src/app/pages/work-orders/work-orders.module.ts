import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkOrdersRoutingModule } from './work-orders-routing.module';
import { WorkOrdersComponent } from './work-orders.component';
import { CreateWorkOrderComponent } from './create-work-order/create-work-order.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import {CdkAccordionModule} from '@angular/cdk/accordion';
import { ViewWorkOrderComponent } from './view-work-order/view-work-order.component';
import {MatListModule} from '@angular/material/list'
import {MatTabsModule} from '@angular/material/tabs'
import {MatBadgeModule} from '@angular/material/badge'



@NgModule({
  declarations: [
    WorkOrdersComponent,
    CreateWorkOrderComponent,
    ViewWorkOrderComponent
  ],
  imports: [
    CommonModule,
    WorkOrdersRoutingModule,
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
    MatDialogModule,
    MatCheckboxModule,
    MatSortModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    CdkAccordionModule,
    MatListModule,
    MatTabsModule,
    MatBadgeModule
  ]
})
export class WorkOrdersModule { }
