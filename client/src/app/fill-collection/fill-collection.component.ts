import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params} from '@angular/router';
import { switchMap } from 'rxjs';
import { CollectionService } from '../services/collection.service';
import { JwtService } from '../services/jwt.service';
import { Collection } from '../shared/collection';
import { Location } from '@angular/common';

@Component({
  selector: 'app-fill-collection',
  templateUrl: './fill-collection.component.html',
  styleUrls: ['./fill-collection.component.scss']
})
export class FillCollectionComponent implements OnInit {

  constructor(
    private collectionService: CollectionService,
    private route: ActivatedRoute,
    private jwtService: JwtService,
    private location: Location,
  ) { }

  collection: Collection | undefined;

  ngOnInit(){

/*     const token = localStorage.getItem('token');
    if(token){
      const decodedToken = this.jwtService.decodeToken(token);
      this.intermediateService.getIntermediate(decodedToken._id)
      .then((intermediate) => {
        this.collectionIds = intermediate.collectionId;
      })
    } */

/*     this.route.paramMap.pipe(
      switchMap((params: Params) => {
        return this.collectionService.getCollection(params['get']('id'));
      }))
      .subscribe(collectionData => {
        this.collection = collectionData;
        console.log(this.collection._id)
      }); */
  }

  goBack() {
    this.location.back();
  }

}
