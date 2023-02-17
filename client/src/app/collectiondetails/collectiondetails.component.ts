import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap } from 'rxjs';
import { CollectionService } from '../services/collection.service';
import { Collection } from '../shared/collection';
import { Location } from '@angular/common';
import { AddToLibraryComponent } from '../add-to-library-dialog/add-to-library-dialog.component';


export interface DialogData {
  collectionName: string;
  collectionId: string;
}

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

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((params: Params) => {
        return this.collectionService.getCollection(params['get']('id'));
      }))
      .subscribe(collectionData => {
        this.collection = collectionData;
      });
  }

  openDialog():void {
    const dialogRef = this.dialog.open(AddToLibraryComponent, {
      data: { collectionName: this.collection?.name, collectionId: this.collection?._id }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  goBack() {
    this.location.back();
  }
}