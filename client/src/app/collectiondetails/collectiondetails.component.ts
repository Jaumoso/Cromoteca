import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { CollectionService } from '../services/collection.service';
import { Collection } from '../shared/collection';
import { Location } from '@angular/common';
import { AddToLibraryComponent } from '../add-to-library-dialog/add-to-library-dialog.component';
import { JwtService } from '../services/jwt.service';
import { UserService } from '../services/user.service';
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
    private dialog: MatDialog,
    private location: Location,
    private jwtService: JwtService,
    private userService: UserService,
    private router: Router
    ) { }

  collection: Collection | undefined;
  collectionIds: string[] | undefined;

  ngOnInit() {

    const token = localStorage.getItem('token');
    if(token){
      if(this.jwtService.isTokenExpired(token)){
        this.router.navigateByUrl('/home');
      }
      const decodedToken = this.jwtService.decodeToken(token);
      this.userService.getUser(decodedToken._id)
      .then((user) => {
        this.collectionIds = user.collectionId;
      })
      .catch((error) => {console.error(error);});
    }

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
      this.collectionIds?.push(result.collectionId);
    });
  }

  goBack() {
    this.location.back();
  }
}