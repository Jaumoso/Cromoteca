import { Injectable } from '@angular/core';
import { Advert } from '../shared/advert';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
  export class AdvertService {
    constructor(
        private http: HttpClient
        ) { }

    getAdverts(): Observable<Advert[]> {
      return  this.http.get<{advertData: Advert[]}>(baseURL + 'advert')
      .pipe(map(adverts => adverts.advertData));
    }

    getAdvert(advertId: string): Observable<Advert> {
      return this.http.get<{advertData: Advert}>(baseURL + 'advert/' + advertId)
      .pipe(map(advert => advert.advertData));
    }

    getUserAdverts(userId: string): Observable<Advert[]> {
      return this.http.get<{advertData: Advert[]}>(baseURL + 'advert/user/' + userId)
      .pipe(map(advert => advert.advertData));
    }

    checkExistingAdvert(card_id: string): Promise<boolean> {
      return new Promise((resolve, reject) => {
        this.http.get<{advertData: Advert}>(baseURL + 'advert/checkadvert/' + card_id)
        .subscribe(user => {
          if(user.advertData){
            resolve(true);
          }
          else{
             resolve(false);
          }
        }, err => {
          reject(err);
        });
      });
    }

    createAdvert(advert: Advert): Observable<Advert> {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };
      return this.http.post<{advertData: Advert}>(baseURL + 'advert/new', advert, httpOptions)
      .pipe(map(advert => advert.advertData));
    }

    deleteAdvertCard(card_id: string): Observable<Advert> {
      return this.http.delete<{advertData: Advert}>(baseURL + 'advert/deletecard/' + card_id)
        .pipe(map(advert => advert.advertData));
    }

    deleteAdvert(advertId: string): Observable<Advert> {
      return this.http.delete<{advertData: Advert}>(baseURL + 'advert/delete/' + advertId)
        .pipe(map(advert => advert.advertData));
    }
}