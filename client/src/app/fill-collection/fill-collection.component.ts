import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Params} from '@angular/router';
import { switchMap } from 'rxjs';
import { CollectionService } from '../services/collection.service';
import { JwtService } from '../services/jwt.service';
import { Collection } from '../shared/collection';
import { Location } from '@angular/common';
import { IntermediateService } from '../services/intermediate.service';
import { CardService } from '../services/card.service';
import { Card } from '../shared/card';

@Component({
  selector: 'app-fill-collection',
  templateUrl: './fill-collection.component.html',
  styleUrls: ['./fill-collection.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FillCollectionComponent implements OnInit {

  constructor(
    private collectionService: CollectionService,
    private route: ActivatedRoute,
    private jwtService: JwtService,
    private location: Location,
    private intermediateService: IntermediateService,
    private cardService: CardService
  ) { }

  collection: Collection | undefined;
  cards: Card[] = [];
  completed: number = 0;
  missing: number = 0;
  gridColumns: number = 3;
  cardList: number[] = [];

  ngOnInit(){
    this.route.paramMap.pipe(
      switchMap((params: Params) => {
        return this.collectionService.getCollection(params['get']('id'));
      }))
      .subscribe(collectionData => {
        this.collection = collectionData;
      });

    const token = localStorage.getItem('token');
    if(token){
      const decodedToken = this.jwtService.decodeToken(token);
      this.intermediateService.getIntermediate(decodedToken._id)
      .then((intermediate) => {
        // ! hacer algo con el intermediate
        // ? no me queda claro como integrar las cartas
        this.cardService.getUserCardsCollection(decodedToken._id, this.collection?._id!)
        .then((cards) => {
          // Crear un array con el total de elementos en la colección
          const collectionSize = this.collection?.size || 0;
          this.cardList = Array(collectionSize).fill(0);
          this.cards = cards;
          // Verificar si cada carta está en el array de cartas
          cards.forEach((card) => {
            const cardIndex = card.cardId;
            if (cardIndex! <= collectionSize) {
              this.cardList[cardIndex! - 1] = 1;
            }
          });

          console.log(this.cardList);
        });
      })
    }
  }

  goBack() {
    this.location.back();
  }

  addCard(){

  }

}
