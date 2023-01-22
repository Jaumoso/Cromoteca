import { Injectable } from '@angular/core';
import { Collection } from '../shared/collection';
import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { of, Observable } from 'rxjs';
import { delay, map, catchError } from 'rxjs/operators';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
    providedIn: 'root'
  })
  export class CollectionService {
    constructor(private http: HttpClient,
        private processHTTPMsgService: ProcessHTTPMsgService) { }

/*     getCollections(): Observable<Collection[]> {
        return this.http.get<Collection[]>(baseURL + 'collection')
        .pipe(this.processHTTPMsgService.handleError);
    } */

/*     getCollection(): Promise<Collection[]> {
        return new Promise((resolve, reject) => {
          this.http.get<Collection[]>(baseURL + 'collection')
          .subscribe(collections => {
            resolve(collections);
          }, err => {
            reject(err);
          });
        });
    } */

    getCollections(): Promise<Collection[]> {
        return new Promise((resolve, reject) => {
          this.http.get<{collectionData: Collection[]}>(baseURL + 'collection')
          .subscribe(collections => {
            resolve(collections.collectionData);
          }, err => {
            reject(err);
          });
        });
    }

    getCollection(collectionId: string): Promise<Collection> {
      return new Promise((resolve, reject) => {
        this.http.get<{collectionData: Collection}>(baseURL + 'collection/' + collectionId)
        .subscribe(collection => {
          resolve(collection.collectionData); console.log(collection.collectionData);
        }, err => {
          reject(err);
        });
      });
    }

    // FUNCIONES PARA ADMINISTRADORES
    createCollection(collection: Collection): Promise<Collection> {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };
      return new Promise((resolve, reject) => {
        this.http.post<Collection>(baseURL + 'collection/new', collection, httpOptions)
        .subscribe(collections => {
          resolve(collections);
        }, err => {
          reject(err);
        });
      });
    }

    editCollection(collectionId: string, collection: Collection): Promise<Collection> {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };
      return new Promise((resolve, reject) => {
        this.http.put<Collection>(baseURL + 'collection/edit' + collectionId, collection, httpOptions)
        .subscribe(collections => {
          resolve(collections);
        }, err => {
          reject(err);
        });
      });
    }

    deleteCollection(collectionId: string): Promise<Collection> {
      return new Promise((resolve, reject) => {
        this.http.delete<Collection>(baseURL + 'collection/delete' + collectionId)
        .subscribe(collections => {
          resolve(collections);
        }, err => {
          reject(err);
        });
      });
    }
}