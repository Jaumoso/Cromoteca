import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AdvertService } from '../services/advert.service';
import { Location } from '@angular/common';
import { JwtService } from '../services/jwt.service';
import { switchMap } from 'rxjs';
import { Advert } from '../shared/advert';
import { CardService } from '../services/card.service';
import { Card } from '../shared/card';
import { CollectionService } from '../services/collection.service';
import { Collection } from '../shared/collection';
import { User } from '../shared/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-advertdetails',
  templateUrl: './advertdetails.component.html',
  styleUrls: ['./advertdetails.component.scss']
})
export class AdvertdetailsComponent implements OnInit {

  advert: Advert | undefined;
  card: Card | undefined;
  collection: Collection | undefined;
  seller: User | undefined;

  constructor(
    private advertService: AdvertService,
    private location: Location,
    private jwtService: JwtService,
    private route: ActivatedRoute,
    private cardService: CardService,
    private collectionService: CollectionService,
    private userService: UserService
  ) { }

  ngOnInit() {
    // se recoge el token
    const token = localStorage.getItem('token');
    if(token){
      const decodedToken = this.jwtService.decodeToken(token);

      // se recoge el id que se pasa como parametro en la URL
      this.route.paramMap.pipe(
        switchMap((params: Params) => {
          // se busca el advert con el id en params
          return this.advertService.getAdvert(params['get']('id'));
        }))
        .subscribe(advertData => {
          this.advert = advertData;
          // con el advert se averigua la carta que se quiere recuperar
          this.cardService.getCard(this.advert.elementId!)
          .then((card) => {
            this.card = card;
            // se averigua la colección a la que pertenece
            this.collectionService.getCollection(card.collectionId!)
            .then((collection) => {
              this.collection = collection;
            });
          })
          // también se recupera la información del usuario que vende
          .then(() => {
            this.userService.getUser(decodedToken._id)
            .then((user) => {
              this.seller = user;
            })
          })
        });
    }
  }

  goBack() {
    this.location.back();
  }
}
