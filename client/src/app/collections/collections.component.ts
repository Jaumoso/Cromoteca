import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { expand, Observable } from 'rxjs';
import { CollectionService } from '../services/collection.service';
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
    ) { }

  collections: Collection[] = [];
  errmsg: string | undefined;
  gridColumns = 4; // cantdad de colecciones en una fila

  ngOnInit() {
    this.collectionService.getCollections()
      .then(collections => {this.collections = collections; /* console.log(this.collections) */})
      .catch(err => this.errmsg = err);
  }

  openDialog(id: number):void {
    const dialogRef = this.dialog.open(AddToLibraryDialog, {
      data: { collectionName: this.collections[id].name }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  /*   ngOnInit() {
    this.collectionService.getCollections()
      .subscribe((collections) => this.collections = collections, errmsg => this.errmsg= <any>errmsg);
  } */

  /*   toggleGridColumns() {
    this.gridColumns = this.gridColumns === 3? 4 : 3;
  } */

}


export interface DialogData {
  collectionName: string;
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
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}