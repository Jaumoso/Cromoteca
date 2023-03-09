import { Injectable } from '@angular/core';
import { Advert } from '../shared/advert';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { map, Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
    providedIn: 'root'
  })
  export class AdvertService {
    constructor(
        private http: HttpClient,
        private userService: UserService
        ) { }

    getAdverts(): Observable<Advert[]> {
      return  this.http.get<{advertData: Advert[]}>(baseURL + 'advert')
      .pipe(map(adverts => adverts.advertData));
    }

    getAdvert(advertId: string): Observable<Advert> {
      return this.http.get<{advertData: Advert}>(baseURL + 'advert/' + advertId)
      .pipe(map(advert => advert.advertData));
    }

    getAllAdvertsInfo(): Observable<Advert[]> {
        const adverts = this.getAdverts()
 /*        .subscribe((adverts) => {
            adverts.forEach((advert) => {
                this.userService.getUser(advert.userId!)
            });
        }); */
        return adverts;
    }
}