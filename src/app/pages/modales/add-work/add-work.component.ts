import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FloatLabelType, MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { Work } from 'src/app/Models/Work';

@Component({
  standalone: true,
  selector: 'app-add-work',
  templateUrl: './add-work.component.html',
  styleUrls: ['./add-work.component.css'],
  imports:[CommonModule,
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
  ]
})
export class AddWorkComponent implements OnInit {

  floatLabelControl = new FormControl('auto' as FloatLabelType);
  hideRequiredControl = new FormControl(true);
  works!:Work[]
  selectedWork:Work = {
    descripcion:"",
    id:0,
    empresa:"",
    cardCode:"",
    cardName:"",
    oficio:"",
    costoXhora:0,
    timestamp:""
  };
  comments:string="";
  numHoras=0;
  total=0;
  
  options = this._formBuilder.group({
    hideRequired: this.hideRequiredControl,
    floatLabel: this.floatLabelControl,
  });

  constructor(public dialogRef: MatDialogRef<AddWorkComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Work[], private _formBuilder: FormBuilder) {
      this.works=data;      
     }

  ngOnInit(): void {
  }

  getFloatLabelValue(): FloatLabelType {
    return this.floatLabelControl.value || 'auto';
  }

  changeWorkEvent(event:any): void {
    this.selectedWork=event.value;
  }

  onUpdatednumHoras(event:any): void{
    this.numHoras=event.target.value;
    this.total=this.numHoras*this.selectedWork.costoXhora;
    console.log(this.numHoras);
  }

  onUpdatedComments(event:any): void {
    this.comments=event.target.value;
  }


  onNo(): void {
    this.dialogRef.close(
      {
        ok:false
      }
    );
  }

  onYes(): void {
    this.dialogRef.close(
      {
      ok:true,
      selectedWork: this.selectedWork,
      comments: this.comments,
      horas:Number.parseFloat(this.numHoras.toString()),
      total:Number.parseFloat(this.total.toString())
    })
  }
}
