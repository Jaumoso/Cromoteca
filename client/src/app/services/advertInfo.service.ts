import { Injectable } from '@angular/core';
import { CardService } from './card.service';
import { UserService } from './user.service';
import { from, mergeMap, Observable, toArray } from 'rxjs';
import { AdvertService } from './advert.service';
import { CollectionService } from './collection.service';

@Injectable({
  providedIn: 'root'
})
export class AdvertInfoService {
  constructor(
    private cardService: CardService,
    private userService: UserService,
    private advertService: AdvertService,
    private collectionService: CollectionService,
  ) { }

  getAllAdvertsInfo(): Observable<any> {
    return this.advertService.getAdverts().pipe(
      mergeMap(adverts => from(adverts)),
      mergeMap(async advert => {
        const user = await this.userService.getUser(advert.userId!);
        const card = await this.cardService.getCard(advert.elementId!);
        const collection = await this.collectionService.getCollection(card.collectionId!);
        return {
          advertId: advert._id,
          state: advert.state,
          price: advert.price,
          quantity: advert.quantity,
          username: user.username,
          cardName: card.name,
          collectionName: collection.name,
        };
      }),
      toArray()
    );
  }
}
