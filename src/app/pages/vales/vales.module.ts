import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ValesRoutingModule } from './vales-routing.module';
import { ValesComponent } from './vales.component';
import { MatTableModule } from '@angular/material/table'  
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateValeComponent } from './create-vale/create-vale.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule, MatOptionModule, MatPseudoCheckbox } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import { ViewValeComponent } from './view-vale/view-vale.component';
import { ViewQuickHistoryComponent } from './view-quick-history/view-quick-history.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ViewHistoryComponent } from './view-history/view-history.component';
import { EditValeComponent } from './edit-vale/edit-vale.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSortModule } from '@angular/material/sort';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {MatDatepickerModule} from '@angular/material/datepicker';





@NgModule({
  declarations: [
    ValesComponent,
    CreateValeComponent,
    ViewValeComponent,
    ViewQuickHistoryComponent,
    ViewHistoryComponent,
    EditValeComponent
    ],
  imports: [
    CommonModule,
    ValesRoutingModule,
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
    MatNativeDateModule
  ],
  exports: [
    ViewHistoryComponent
  ],
  bootstrap:[ValesComponent]
})
export class ValesModule { }
