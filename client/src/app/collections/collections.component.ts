import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CollectionService } from '../services/collection.service';
import { IntermediateService } from '../services/intermediate.service';
import { Collection } from '../shared/collection';

interface Options {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.scss'],
})
export class CollectionsComponent implements OnInit {
  constructor(
    private collectionService: CollectionService,
    public dialog: MatDialog,
    ) { }

  collections: Collection[] = [];
  errmsg: string | undefined;
  gridColumns = 4; // cantdad de colecciones en una fila

  searchText: string = '';
  selectedCategory: string = '';

    options: Options[] = [
    {value: '', viewValue: '--'},
    {value: 'CARTAS', viewValue: 'Cartas'},
    {value: 'CROMOS', viewValue: 'Cromos'},
    {value: 'STAKS', viewValue: 'Staks'},
  ];

  ngOnInit() {
    this.collectionService.getCollections()
      .then(collections => {this.collections = collections; /* console.log(this.collections) */})
      .catch(err => this.errmsg = err);
  }

  // TODO: tiene que coger texto y categoria al mismo tiempo
/*   filterSearch() {
    console.log(this.selectedCategory)
    this.collectionService.filterCollection(this.searchText, this.selectedCategory);
  } */

  filterSearch() {
    console.log(this.searchText)

    // si el texto está vacío, aparecen de nuevo todas las colecciones
    if(this.searchText.length == 0){
      this.ngOnInit();
      this.errmsg = undefined;
    }
    // si no está vacío, se ejecuta la búsqueda
    else{
      this.collectionService.filterCollection(this.searchText)
      .then(collections => { 
        this.collections = collections; 
        /* console.log(collections); */
        if(collections.length == 0){
          this.errmsg = 'No se han encontrado colecciones!'
        }
      })
      .catch(err => this.errmsg = err);
    }
  }

  openDialog(id: number):void {
    const dialogRef = this.dialog.open(AddToLibraryDialog, {
      data: { collectionName: this.collections[id].name }
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
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  addToLibrary(collectionId: string){
    /* this.intermediateService.addToLibrary(collectionId); */
  }
}