import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-info-training',
  templateUrl: './info-training.component.html',
  styleUrls: ['./info-training.component.css']
})
export class InfoTrainingComponent {

  constructor(
    private dialogRef: MatDialogRef<InfoTrainingComponent>
  ) {}

  close(){
    this.dialogRef.close();
  }
}
