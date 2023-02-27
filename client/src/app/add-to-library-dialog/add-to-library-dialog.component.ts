import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { IntermediateService } from '../services/intermediate.service';
import { JwtService } from '../services/jwt.service';

export interface DialogData {
  collectionName: string;
  collectionId: string;
}

@Component({
  selector: 'app-add-to-library-dialog',
  templateUrl: './add-to-library-dialog.component.html',
  styleUrls: ['./add-to-library-dialog.component.scss']
})
export class AddToLibraryComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<AddToLibraryComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private intermediateService: IntermediateService,
    private jwtService: JwtService,
    private dialog: MatDialog,
  ) {}
  ngOnInit(): void {
    
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
  addToLibrary(collectionId: string){
    const token = localStorage.getItem('token');
    if(token){
      const decodedToken = this.jwtService.decodeToken(token);
      this.intermediateService.getIntermediate(decodedToken._id)
      .then((intermediate) => {
        if(intermediate.collectionId?.filter(str => str.includes(collectionId)).length === 0){
          intermediate.userId = decodedToken._id;
          intermediate.collectionId?.push(collectionId);
          if(intermediate._id != undefined){
            this.intermediateService.updateIntermediate(intermediate._id, intermediate)
            .then(() => {
              this.closeDialog()
            });
          }
        }
      });
    }
    else{
      this.closeDialog();
      this.dialog.open(LoginComponent);
    }
  }

}
