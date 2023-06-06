import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-info-descanso',
  templateUrl: './info-descanso.component.html',
  styleUrls: ['./info-descanso.component.css']
})
export class InfoDescansoComponent {
  constructor(
    private dialogRef: MatDialogRef<InfoDescansoComponent>
  ) {}

  close(){
    this.dialogRef.close();
  }
}
