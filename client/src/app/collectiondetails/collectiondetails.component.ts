import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { catchError, of, Subscription, switchMap } from 'rxjs';
import { CollectionService } from '../services/collection.service';
import { Collection } from '../shared/collection';

@Component({
  selector: 'app-collectiondetails',
  templateUrl: './collectiondetails.component.html',
  styleUrls: ['./collectiondetails.component.scss']
})
export class CollectiondetailsComponent implements OnInit {

  constructor(private collectionService: CollectionService,
    private route: ActivatedRoute) { }

  collection: Collection | undefined;
  errMsg: string | undefined;
  subscription: Subscription | undefined;

  ngOnInit() {
    this.subscription = this.route.paramMap.pipe(
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
}
