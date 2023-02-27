import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { FloatLabelType } from '@angular/material/form-field';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UnidadService } from 'src/app/services/unidad.service';
import { ConfirmComponent } from '../../modales/confirm/confirm.component';

@Component({
  selector: 'app-create-labor',
  templateUrl: './create-labor.component.html',
  styleUrls: ['./create-labor.component.css'],
  providers: [MatSnackBar, MatDialog, {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher}]

})
export class CreateLaborComponent implements OnInit {

  creando:Boolean = false;

  constructor(private _formBuilder: FormBuilder, private unidadService: UnidadService, public dialog: MatDialog) { }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  getFloatLabelValue(): FloatLabelType {
    return this.floatLabelControl.value || 'auto';
  }

  hideRequiredControl = new FormControl(true);
  floatLabelControl = new FormControl('auto' as FloatLabelType);
  options = this._formBuilder.group({
    hideRequired: this.hideRequiredControl,
    floatLabel: this.floatLabelControl,
  });


  openDialog(): void {
    /**if(this.fieldsWithErrors()) {
      this.snackBar.open("Algunos campos son requeridos o tienen error favor de verificar");
      return;
    }*/
    
    this.creando = true;
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '400px',
      data: "Estas seguro de crear esta mano de obra?"
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if(result){
        
      } else {
        
      }
      this.creando = false;
    });
  }

  onUpdatedOficio(even:any): void {
    
  }

  onUpdatedCostHour(even:any): void {
    
  }


  onUpdatedAccount(even:any): void {
    
  }


  onUpdatedDescription(even:any): void {
    
  }

}
