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
import { AddAdvertComponent } from '../add-advert/add-advert.component';

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
    public addElementDialog: MatDialog,
    public createAdvertDialog: MatDialog,
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
  adverts: number[] = [];

  ngOnInit(){
    // coge el id de la colección pasado como parámetro y recupera la información
    this.route.paramMap.pipe(
      switchMap((params: Params) => {
        return this.collectionService.getCollection(params['get']('id'));
      }))
      .subscribe(collectionData => {
        this.collection = collectionData;
      });
    
    // recoge el token de sesión y recupera info de usuario
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
            this.completed = this.completarSiUnico(cards);
            this.missing = this.collection!.size! - this.completed;
            this.percentage = (this.completed / this.collection!.size! * 100).toFixed(2);
            // Verificar si cada carta está en el array de cartas
            cards.forEach((card) => {
              const cardIndex = card.cardId;
              if (cardIndex! <= collectionSize) {
                this.cardList[cardIndex! - 1] = 1;
              }
              // comprueba que exista un advert para el elemento. Si existe, guarda el id del elemento para no crear otro advert
              this.advertService.checkExistingAdvert(card._id!)
              .then((exists) => {
                if(exists){
                  this.adverts.push(card.cardId!);
                }
              });
            });
          });
        }
      })
    }
  }

  // devuelve el total de cartas con ID único
  completarSiUnico(cards: Card[]){
    const set = new Set<number>();
    let uniqueCount = 0;
    for (const card of cards) {
      if (!set.has(card.cardId!)) {
        // Si el número no está en el conjunto, lo agregamos y contamos como único
        set.add(card.cardId!);
        uniqueCount++;
      }
    }
    return uniqueCount;
  }

  // si true, la carta ya existe en el array
  comprobarSiUnico(cardId: number): boolean{
    let unique: boolean = true;
    let count: number = 0;
    this.cards.forEach((card) => {
      if(card.cardId === cardId){count++}
    })
    if(count > 1){unique = false;}
    return unique;
  }

  existe(cardId: number): boolean {
    let existe: boolean = false;
    for(let i = 0; i < this.cards.length; i++){
      if(this.cards[i].cardId === cardId){existe = true}
    }
    return existe;
  }

  addElement() {
    const dialogRef = this.addElementDialog.open(AddElementComponent, {
      data: { collectionId: this.collection?._id, userId: this.userId, collectionSize: this.collection?.size, card: new Card }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result && result.card){
        this.cardService.createCard(result.card)
        .then((card) => {
          // si se ha creado el elemento
          if(card){
            this.showSnackBar("Elemento añadido a la colección");

            // Se añade el elemento al array de elementos
            this.cards.push(card);
            this.cardList[result.card.cardId-1] = 1;

            // si no existe la carta en el array
            const unique = this.comprobarSiUnico(result.card.cardId);
            if(unique){
              this.missing = this.missing-1;
              this.completed = this.completed +1;
            }
            
            this.percentage = (this.completed / this.collection!.size! * 100).toFixed(2);
            // Se añade el elemento a la colección del usuario en la BD

          }
          else{
            this.showSnackBar("Ha habido un problema al añadir el elemento");
          }
        });
      }
    });
  }

  deleteElement(card: Card) {
    this.cardService.deleteCard(card._id!)
    .subscribe(() => {
      // quitar carta del array
      const index = this.cards.indexOf(card);
      this.cards.splice(index, 1);

      // TODO: comprobar que esto funciona correctamente
      // si existe un anuncio, lo borra también
      this.advertService.deleteAdvertCard(card._id!)
      .subscribe((deletedAdvert) => {
        if(deletedAdvert) {
          // borra del array de adverts el id del elemento.
          const index = this.adverts.indexOf(card.cardId!);
          this.adverts.splice(index, 1);
        }
      })

      // si no existe en el array
      if(!this.existe(card.cardId!)){
        this.cardList[card.cardId!-1] = 0;
        this.missing = this.missing+1;
        this.completed = this.completed -1;
      }
      
      this.percentage = (this.completed / this.collection!.size! * 100).toFixed(2);
      this.showSnackBar("Elemento " + card.cardId + " eliminado");
    });
  }

  createAdvert(card:Card) {
    // Abrir diálogo con formulartio de advert
    const dialogRef = this.createAdvertDialog.open(AddAdvertComponent, {
      data: { 
        userId: this.userId, 
        collectionId: this.collection?._id, 
        card: card,
        advert: new Advert,
      }
    });

    // recuperar información del diálogo y crear el anuncio
    dialogRef.afterClosed().subscribe(result => {
      if(result && result.advert){
        console.log(result.advert)
        this.advertService.createAdvert(result.advert)
        .subscribe(data => {
          this.adverts.push(card.cardId!);
          this.showSnackBar("Anuncio creado");
        });
      }
    });


  }

  // función para mostrar una MatSnackBar
  showSnackBar(message: string){
    this.snackBar.open(
      message, 
      "Aceptar",
      {
        verticalPosition: 'top',
        duration: 6000,
        panelClass: ['snackbar']
      });
  }

  // función para hacer scroll hasta el elemento pulsado
  scroll(id: number) {
    let element = document.getElementById(id.toString());
    element!.scrollIntoView({behavior: 'smooth'});
  }

  // devuelve al usuairo a la vista anterior
  goBack() {
    this.location.back();
  }
  
}
