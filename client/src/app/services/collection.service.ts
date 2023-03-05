import { Injectable } from '@angular/core';
import { Collection } from '../shared/collection';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { map, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
  export class CollectionService {
    constructor(private http: HttpClient) { }

    getCollections(): Observable<Collection[]> {
      return  this.http.get<{collectionData: Collection[]}>(baseURL + 'collection')
      .pipe(map(collections => collections.collectionData));
    }

    getCollection(collectionId: string): Observable<Collection> {
      return this.http.get<{collectionData: Collection}>(baseURL + 'collection/' + collectionId)
      .pipe(map(collection => collection.collectionData));
    }
}