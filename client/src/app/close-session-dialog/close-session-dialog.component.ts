import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-close-session-dialog',
  templateUrl: './close-session-dialog.component.html',
  styleUrls: ['./close-session-dialog.component.scss']
})
export class CloseSessionDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<CloseSessionDialogComponent>) {}
  ngOnInit(): void {
    // Vacío de forma intencional
  }

  closeDialog(){
    this.dialogRef.close();
  }
}
