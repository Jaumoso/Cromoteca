import { ChangeDetectorRef, Component, HostListener, OnInit, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Params, Router} from '@angular/router';
import { switchMap } from 'rxjs';
import { CollectionService } from '../services/collection.service';
import { JwtService } from '../services/jwt.service';
import { Collection } from '../shared/collection';
import { Location } from '@angular/common';
import { CardService } from '../services/card.service';
import { Card } from '../shared/card';
import { MatDialog } from '@angular/material/dialog';
import { AddElementComponent } from '../add-element/add-element.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdvertService } from '../services/advert.service';
import { Advert } from '../shared/advert';
import { AddAdvertComponent } from '../add-advert/add-advert.component';
import { UserService } from '../services/user.service';
import { UpdateElementComponent } from '../update-element/update-element.component';

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
    private userService: UserService,
    private cardService: CardService,
    public addElementDialog: MatDialog,
    public createAdvertDialog: MatDialog,
    private snackBar: MatSnackBar,
    private advertService: AdvertService,
    private router: Router,
  ) { }

  collection: Collection | undefined;
  userId: string | undefined;
  cards: Card[] = [];
  filteredCards: Card[] = [];
  completed: number = 0;
  missing: number = 0;
  percentage: string = '';
  gridColumns: number = 3;
  cardList: number[] = [];
  adverts: string[] = [];
  value: number = 0;
  windowScrolled: boolean = false;
  public isLoading = true;
  nuevo: number = 0;
  seminuevo: number = 0;
  usado: number = 0;
  roto: number = 0;
  totalCards: number = 0;

  searchText: string = '';

  ngOnInit() {
    // coge el id de la colección pasado como parámetro y recupera la información
    this.route.paramMap.pipe(
      switchMap((params: Params) => this.collectionService.getCollection(params['get']('id')))
    ).subscribe(collectionData => {
      this.collection = collectionData;
      // recoge el token de sesión y recupera info de usuario
      const token = localStorage.getItem('token');
      if (!token) {
        this.isLoading = false;
        return;
      }
  
      if (this.jwtService.isTokenExpired(token)) {
        this.isLoading = false;
        this.router.navigateByUrl('/home');
        return;
      }
  
      const decodedToken = this.jwtService.decodeToken(token);
      this.userId = decodedToken._id;
  
      this.userService.getUser(decodedToken._id)
        .then((user) => {
          if (!user) {
            this.isLoading = false;
            return;
        }
        this.cardService.getUserCardsCollection(decodedToken._id, this.collection?._id!)
          .subscribe((cards) => {
            // Crear un array con el total de elementos en la colección
            const collectionSize = this.collection?.size ?? 0;
            this.cardList = Array(collectionSize).fill(0);
            this.cards = cards;
            this.filteredCards = cards;
            this.completed = this.completarSiUnico(cards);
            this.missing = this.collection!.size! - this.completed;
            this.percentage = (this.completed / this.collection!.size! * 100).toFixed(2);
            
            // Verificar si cada carta está en el array de cartas
            cards.forEach((card) => {
              const cardIndex = card.cardId;
  
              if (cardIndex != undefined && cardIndex <= collectionSize) {
                this.cardList[cardIndex - 1] = 1;
              }
              // comprueba que exista un advert para el elemento. Si existe, guarda el id del elemento para no crear otro advert
              this.advertService.checkExistingAdvert(card._id!)
                .then((exists) => {
                  if (exists) {
                    this.adverts.push(card._id!);
                  }
                })
                .catch((error) => {console.error(error);});

              // Sumar precio de las cartas para obtener valor de la colección
              this.value += card.price!;
              // Sumar total de cartas
              this.totalCards += card.quantity!;
              // Sumar estados de las cartas
              if (card.state == 'NUEVO') {this.nuevo += card.quantity!;} 
              else if (card.state == 'SEMINUEVO') {this.seminuevo += card.quantity!;} 
              else if (card.state == 'USADO') {this.usado += card.quantity!;} 
              else if (card.state == 'ROTO') {this.roto += card.quantity!;}
            });
            this.isLoading = false;
          });
      })
      .catch((error) => {console.error(error);});
    });
    this.goToTop();
  }

  searchCards(): Card[] {
    // If no search text or category is provided, return all collections
    if (!this.searchText) {
      return this.cards;
    }
    
    // Filter the collections based on the search text and category
    const filteredCards = this.cards.filter((card) => {
      const isMatch = (str: string) =>
        str
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .includes(this.searchText!.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')); 
      
      if(card.name != undefined && card.description != undefined){
        return (!this.searchText || isMatch(card.name) || isMatch(card.description) || isMatch(card.cardId!.toString()) || isMatch(card.price!.toString()) || isMatch(card.quantity!.toString()));
      }
      return this.cards;
    });
    
    this.filteredCards = filteredCards;
    return filteredCards;
}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.hasOwnProperty('cards')) {
      this.ngOnInit();
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
    for(let card of this.cards){
        if(card.cardId === cardId){
            existe = true;
            break;
        }
    }
    return existe;
  }

  addElement() {
    const dialogRef = this.addElementDialog.open(AddElementComponent, {
      data: { collectionId: this.collection?._id, userId: this.userId, collectionSize: this.collection?.size, card: new Card }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result?.card){
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
            this.value += card.price!;

            this.totalCards += card.quantity!;

            if (card.state == 'NUEVO') {this.nuevo += card.quantity!;} 
            else if (card.state == 'SEMINUEVO') {this.seminuevo += card.quantity!;} 
            else if (card.state == 'USADO') {this.usado += card.quantity!;} 
            else if (card.state == 'ROTO') {this.roto += card.quantity!;}

          }
          else{
            this.showSnackBar("Ha habido un problema al añadir el elemento");
          }
        })
        .catch((error) => {console.error(error);});
      }
    });
  }

  updateElement(card: Card) {
    const dialogRef = this.addElementDialog.open(UpdateElementComponent, {
      data: { collectionId: this.collection?._id, userId: this.userId, card }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result?.card){
        this.cardService.updateCard(result.card)
        .subscribe(() => {
          // si se ha modificado el elemento
          this.showSnackBar("Elemento modificado");
        });
      }
    });
  }

  deleteElement(card: Card) {
    // si existe un anuncio para esa carta lo borra
    this.advertService.deleteAdvertCard(card._id!)
    .subscribe((deletedAdvert) => {
      if(deletedAdvert) {
        // borra del array de adverts el id del elemento.
        const index = this.adverts.indexOf(card._id!);
        this.adverts.splice(index, 1);
      }
    });

    this.cardService.deleteCard(card._id!)
    .subscribe(() => {
      // quitar carta del array
      const index = this.cards.indexOf(card);
      this.cards.splice(index, 1);

      // si no existe en el array
      if(!this.existe(card.cardId!)){
        this.cardList[card.cardId!-1] = 0;
        this.missing = this.missing+1;
        this.completed = this.completed -1;
      }
      
      this.percentage = (this.completed / this.collection!.size! * 100).toFixed(2);
      this.value -= card.price!;
      this.totalCards -= card.quantity!;

      if (card.state == 'NUEVO') {this.nuevo -= card.quantity!;} 
      else if (card.state == 'SEMINUEVO') {this.seminuevo -= card.quantity!;} 
      else if (card.state == 'USADO') {this.usado -= card.quantity!;} 
      else if (card.state == 'ROTO') {this.roto -= card.quantity!;}

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
      if(result?.advert){
        this.advertService.createAdvert(result.advert)
        .subscribe(() => {
          this.adverts.push(card._id!);
          this.showSnackBar("Anuncio creado");
        });
      }
    });
  }

  deleteAdvert(card: Card) {
    // si existe un anuncio para esa carta lo borra
    this.advertService.deleteAdvertCard(card._id!)
    .subscribe(() => {
        // borra del array de adverts el id del elemento.
        const index = this.adverts.indexOf(card._id!);
        this.adverts.splice(index, 1);
        this.showSnackBar("Anuncio eliminado");
    });
  }

  gotoAdvert(card: Card) {
    this.advertService.getAdvertByCard(card._id!)
    .subscribe((advert) => {
      this.router.navigate(['/advertdetails', advert._id]);
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

  // Botón para volver al tope de la página
  @HostListener("window:scroll", [])
  onWindowScroll() {
    if (window.pageYOffset > 500) {
      this.windowScrolled = true;
    } else if (this.windowScrolled && window.pageYOffset < 500) {
      this.windowScrolled = false;
    }
  }

  scrollToTop() {
    (function smoothscroll() {
      var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll > 0) {
        window.requestAnimationFrame(smoothscroll);
        window.scrollTo(0, currentScroll - (currentScroll / 8));
      }
    })();
  }

  goToTop() {
    window.scrollTo(0, 0);
  }
}
