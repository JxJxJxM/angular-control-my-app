import { Component, Inject, OnInit } from '@angular/core';
import { MatCard, MatCardModule } from '@angular/material/card';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  standalone: true,
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css'], 
  imports:[MatCardModule],
  
})
export class ConfirmComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: String
  ) {}

  ngOnInit(): void {
    
  }

  onNo(): void {
    this.dialogRef.close(false);
  }

  onYes(): void {
    this.dialogRef.close(true)
  }

}
