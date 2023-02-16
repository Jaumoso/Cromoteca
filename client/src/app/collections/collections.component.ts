import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { AuthService } from '../services/auth.service';
import { CollectionService } from '../services/collection.service';
import { IntermediateService } from '../services/intermediate.service';
import { JwtService } from '../services/jwt.service';
import { Collection } from '../shared/collection';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.scss'],
})
export class CollectionsComponent implements OnInit {

  constructor(
    private collectionService: CollectionService,
    public dialog: MatDialog,
    private intermediateService: IntermediateService,
    private jwtService: JwtService,
    ) { }

  collections: Collection[] = [];
  filteredCollections: Collection[] = [];
  errmsg: string = 'No se han encontrado colecciones!';
  gridColumns = 4; // cantdad de colecciones en una fila
  searchText: string = '';
  userCollections: string[] = [];

  ngOnInit() {

    const token = localStorage.getItem('token');
    if(token){
      const decodedToken = this.jwtService.decodeToken(token);
      this.intermediateService.getIntermediate(decodedToken._id)
      .then((intermediate) => {
        this.userCollections = intermediate.collectionId!
      })
    }
    this.collectionService.getCollections()
    .then(collections => {
      this.collections = collections;
      this.filteredCollections = collections;
    })
    .catch(err => this.errmsg = err);
  }

  searchCollections(): Collection[] {
    // If no search text or category is provided, return all collections
    if (this.searchText == '') {
      return this.filteredCollections = this.collections;
    }
    // Filter the collections based on the search text and category
    return this.filteredCollections = this.collections.filter((collection) => {
      const isMatch = (str: string) =>
        str.toLowerCase().includes(this.searchText.toLowerCase());
      
      if(collection.name != undefined && collection.description != undefined){
        return (
          (!this.searchText || isMatch(collection.name) || isMatch(collection.description) || isMatch(collection.year!.toString()))
        );
      }
      return this.collections;
    });
  }

  openDialog(id: number):void {
    const dialogRef = this.dialog.open(AddToLibraryDialog, {
      data: { collectionName: this.collections[id].name, collectionId: this.collections[id]._id }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

export interface DialogData {
  collectionName: string;
  collectionId: string;
}

@Component({
  selector: 'dialog-content',
  templateUrl: 'dialog-add-to-library.html',
  styleUrls: ['./collections.component.scss']
})
export class AddToLibraryDialog {
  
  constructor(
    public dialogRef: MatDialogRef<AddToLibraryDialog>, 
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private intermediateService: IntermediateService,
    private jwtService: JwtService,
    private dialog: MatDialog,
  ) {}

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