import { Component, OnInit } from '@angular/core';
import { expand, Observable } from 'rxjs';
import { CollectionService } from '../services/collection.service';
import { Collection } from '../shared/collection';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.scss'],
})
export class CollectionsComponent implements OnInit {
  constructor(private collectionService: CollectionService) { }

  collections: Collection[] | undefined;
  errmsg: string | undefined;
  gridColumns = 4; // cantdad de colecciones en una fila

  ngOnInit() {
    this.collectionService.getCollections()
      .then(collections => {this.collections = collections; /* console.log(this.collections) */})
      .catch(err => this.errmsg = err);
  }


  /*   ngOnInit() {
    this.collectionService.getCollections()
      .subscribe((collections) => this.collections = collections, errmsg => this.errmsg= <any>errmsg);
  } */

  /*   toggleGridColumns() {
    this.gridColumns = this.gridColumns === 3? 4 : 3;
  } */

}
