import { Injectable } from '@angular/core';
import { Advert } from '../shared/advert';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { map, Observable } from 'rxjs';
import { UserService } from './user.service';
import { User } from '../shared/user';
import { CardService } from './card.service';
import { CollectionService } from './collection.service';

@Injectable({
    providedIn: 'root'
  })
  export class AdvertService {
    constructor(
        private http: HttpClient,
        private userService: UserService,
        private cardService: CardService,
        private collectionService: CollectionService
        ) { }

    getAdverts(): Observable<Advert[]> {
      return  this.http.get<{advertData: Advert[]}>(baseURL + 'advert')
      .pipe(map(adverts => adverts.advertData));
    }

    getAdvert(advertId: string): Observable<Advert> {
      return this.http.get<{advertData: Advert}>(baseURL + 'advert/' + advertId)
      .pipe(map(advert => advert.advertData));
    }

    createAdvert(advert: Advert): Observable<Advert> {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };
      return this.http.post<{advertData: Advert}>(baseURL + 'advert/new/', advert, httpOptions)
      .pipe(map(advert => advert.advertData));
    }
}