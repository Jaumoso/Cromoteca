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
import { MatDialog } from '@angular/material/dialog';
import { AddElementComponent } from '../add-element/add-element.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdvertService } from '../services/advert.service';
import { Advert } from '../shared/advert';

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
    private cardService: CardService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private advertService: AdvertService,
  ) { }

  collection: Collection | undefined;
  userId: string | undefined;
  cards: Card[] = [];
  completed: number = 0;
  missing: number = 0;
  percentage: string = '';
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
      this.userId = decodedToken._id;
      this.intermediateService.getIntermediate(decodedToken._id)
      .then((intermediate) => {
        if(intermediate){
          this.cardService.getUserCardsCollection(decodedToken._id, this.collection?._id!)
          .subscribe((cards) => {
            // Crear un array con el total de elementos en la colección
            const collectionSize = this.collection?.size || 0;
            this.cardList = Array(collectionSize).fill(0);
            this.cards = cards;
            this.completed = cards.length;
            this.missing = this.collection!.size! - this.completed;
            this.percentage = (this.completed / this.collection!.size! * 100).toFixed(2);
            // Verificar si cada carta está en el array de cartas
            cards.forEach((card) => {
              const cardIndex = card.cardId;
              if (cardIndex! <= collectionSize) {
                this.cardList[cardIndex! - 1] = 1;
              }
            });
  
            console.log(this.cardList);
          });
        }
      })
    }
  }

  goBack() {
    this.location.back();
  }

  addElement() {
    const dialogRef = this.dialog.open(AddElementComponent, {
      data: { collectionId: this.collection?._id, userId: this.userId, card: new Card }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result && result.card){
        // Se añade el elemento al array de elementos
        this.cards.push(result.card);
        this.cardList[result.card.cardId] = 1;
        // Se añade el elemento a la colección del usuario en la BD
        this.cardService.createCard(result.card)
        .then((card) => {
          console.log(card);
          this.snackBar.open(
            "Elemento añadido a la colección", 
            "Aceptar",
            {
              verticalPosition: 'top',
              duration: 6000,
              panelClass: ['snackbar']
            });
        });
      }
    });
  }

  deleteElement(card: Card) {
    this.cardService.deleteCard(card._id!)
    .subscribe((returnCard) => {
      console.log(returnCard)
      const index = this.cards.indexOf(card);
      this.cards.splice(index, 1);
      this.cardList[card.cardId!-1] = 0;
    });
  }

  // TODO: habrá que hacer otro Dialog
  createAdvert(card:Card) {
    let advert = new Advert;
    advert.elementId = card._id;
    advert.price = card.price; 
    advert.quantity = card.repeated;
    advert.state = card.state;
    advert.userId = this.userId;
    this.advertService.createAdvert(advert)
    .subscribe(data => {
      this.snackBar.open(
        "Anuncio creado", 
        "Aceptar",
        {
          verticalPosition: 'top',
          duration: 6000,
          panelClass: ['snackbar']
        });
    });
  }


  scroll(id: number) {
    let element = document.getElementById(id.toString());
    element!.scrollIntoView({behavior: 'smooth'});
  }
}
