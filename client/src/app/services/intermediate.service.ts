import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseURL } from '../shared/baseurl';
import { Collection } from '../shared/collection';
import { Intermediate } from '../shared/intermediate';
import { CollectionService } from './collection.service';

@Injectable({
    providedIn: 'root'
  })
  export class IntermediateService {
    constructor(
        private http: HttpClient,
        private collectionService: CollectionService
        ) { }

    getCollections(userId: string): Promise<Collection[]> {
        return new Promise((resolve, reject) => {
            this.http.get<{intermediateData: Intermediate}>(baseURL + 'intermediate/user/' + userId)
            .subscribe(intermediate => {
                const collectionIds = intermediate.intermediateData.collectionId;
                console.log('Collection IDs: ' + collectionIds);
                var collections: Collection[] = [];
                if(collectionIds != undefined) {
                    for(var i= 0; i < collectionIds.length; i++) {
                       this.collectionService.getCollection(collectionIds[i])
                       .then((collection) => collections.push(collection));
                    }
                }
                if(collections != undefined) {
                    resolve(collections);
                }
            }, err => {
            reject(err);
            });
        });
    }

    getIntermediate(userId: string): Promise<Intermediate> {
      return new Promise((resolve, reject) => {
        this.http.get<{intermediateData: Intermediate}>(baseURL + 'intermediate/user/' + userId)
        .subscribe(intermediate => {
          resolve(intermediate.intermediateData);
        }, err => {
          reject(err);
        });
      });
    }


    updateIntermediate(intermediateId: string, intermediate: Intermediate): Promise<Intermediate> {
        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json'
          })
        };
        return new Promise((resolve, reject) => {
          this.http.put<{updatedIntermediate: Intermediate}>(baseURL + 'intermediate/update/' + intermediateId, intermediate, httpOptions)
          .subscribe(intermediate => {
            resolve(intermediate.updatedIntermediate); console.log(intermediate);
          }, err => {
            reject(err);
          });
        });
      }
}