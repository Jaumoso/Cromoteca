import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { JwtService } from '../services/jwt.service';
import { UserService } from '../services/user.service';

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
    private userService: UserService,
    private jwtService: JwtService,
    private dialog: MatDialog,
  ) {}
  ngOnInit(): void {
    // Vacío de forma intencional
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
  addToLibrary(collectionId: string){
    const token = localStorage.getItem('token');
    if(token){
      const decodedToken = this.jwtService.decodeToken(token);
      this.userService.getUser(decodedToken._id)
      .then((user) => {
        if(user.collectionId?.filter(str => str.includes(collectionId)).length === 0){
          user._id = decodedToken._id;
          user.collectionId?.push(collectionId);
          if(user._id != undefined){
            this.userService.updateUserContent(user._id, user)
            .then(() => {
              this.closeDialog()
            })
            .catch((error) => {
              console.error(error);
            });
          }
        }
      })
      .catch((error) => {
        console.error(error);
      });
    }
    else{
      this.closeDialog();
      this.dialog.open(LoginComponent);
    }
  }

}
