import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap } from 'rxjs';
import { CollectionService } from '../services/collection.service';
import { Collection } from '../shared/collection';
import { Location } from '@angular/common';

@Component({
  selector: 'app-collectiondetails',
  templateUrl: './collectiondetails.component.html',
  styleUrls: ['./collectiondetails.component.scss']
})
export class CollectiondetailsComponent implements OnInit {

  constructor(
    private collectionService: CollectionService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private location: Location,
    ) { }

  collection: Collection | undefined;
  errMsg: string | undefined; // TODO:
  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((params: Params) => {
        return this.collectionService.getCollection(params['get']('id'));
      }))
      .subscribe(collectionData => {
        this.collection = collectionData;
  /*  this.collectioncopy = collection; 
      this.setPrevNext(dish.id);
      this.visibility = 'shown';  */
      });
  }

  openDialog():void {
    const dialogRef = this.dialog.open(AddToLibraryDialog, {
      data: { collectionName: this.collection?.name }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  goBack() {
    this.location.back();
  }
}

export interface DialogData {
  collectionName: string;
}

@Component({
  selector: 'dialog-content',
  templateUrl: 'dialog-add-to-library.html',
  styleUrls: ['./collectiondetails.component.scss']
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