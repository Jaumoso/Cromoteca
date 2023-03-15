import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  deleteCollection: boolean;
  collectionName: string;
}

@Component({
  selector: 'app-remove-from-library-dialog',
  templateUrl: './remove-from-library-dialog.component.html',
  styleUrls: ['./remove-from-library-dialog.component.scss']
})
export class RemoveFromLibraryDialogComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<RemoveFromLibraryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) { }

  ngOnInit(): void {
    // Vacío de forma intencional
  }

  onSubmit(){
    this.data.deleteCollection = true;
    this.closeDialog();
  }

  closeDialog(): void {
    this.dialogRef.close(this.data);
  }

}
