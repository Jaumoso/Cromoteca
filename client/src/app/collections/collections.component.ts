import { Component, Inject, OnInit, SimpleChanges } from '@angular/core';
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
  filteredCollections: Collection[] = [];
  errmsg: string | undefined;
  gridColumns = 4; // cantdad de colecciones en una fila
  searchText: string = '';

  ngOnInit() {
    this.collectionService.getCollections()
      .then(collections => {
        this.collections = collections;
        this.filteredCollections = collections;
      })
      .catch(err => this.errmsg = err);

  }

  searchCollections(): Collection[] {

    // If no search text or category is provided, return all collections
    if (this.searchText == undefined) {
      return this.filteredCollections = this.collections;
    }
  
    // Filter the collections based on the search text and category
    return this.filteredCollections = this.collections.filter((collection) => {
      const isMatch = (str: string) =>
        str.toLowerCase().includes(this.searchText.toLowerCase());
      
      if(collection.name != undefined && collection.description != undefined){
        this.errmsg = '';
        return (
          (!this.searchText || isMatch(collection.name) || isMatch(collection.description) || isMatch(collection.year!.toString()))
        );
      }
      if(collection == undefined) {
        this.errmsg = 'No se han encontrado colecciones!';
      }
      return this.collections;
    });
  }

/*   filterSearch() {
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
        if(collections.length == 0){
          this.errmsg = 'No se han encontrado colecciones!'
        }
      })
      .catch(err => this.errmsg = err);
    }
  } */

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