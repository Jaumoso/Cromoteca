import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AdvertService } from '../services/advert.service';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs';
import { Advert } from '../shared/advert';
import { CardService } from '../services/card.service';
import { Card } from '../shared/card';
import { CollectionService } from '../services/collection.service';
import { Collection } from '../shared/collection';
import { User } from '../shared/user';
import { UserService } from '../services/user.service';
import { LoginStatusService } from '../services/loginStatus.service';
import { JwtService } from '../services/jwt.service';
import { AddressService } from '../services/address.service';

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
  loggedIn: boolean = false;
  currentUser: string | undefined;
  city: string | undefined;
  province: string | undefined;
  country: string | undefined;

  constructor(
    private advertService: AdvertService,
    private location: Location,
    private route: ActivatedRoute,
    private cardService: CardService,
    private collectionService: CollectionService,
    private userService: UserService,
    private loginStatusService: LoginStatusService,
    private jwtService: JwtService,
    private addressService: AddressService
  ) { }

  ngOnInit() {
    
    this.loginStatusService.loginChanges.subscribe((loggedIn) => {
      this.loggedIn = loggedIn;
    });

    const token = localStorage.getItem('token');
    if(token){
      if(!this.jwtService.isTokenExpired(token)){
        this.loggedIn = true;
      }
      const decodedToken = this.jwtService.decodeToken(token);
      this.currentUser = decodedToken.username;
    }

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
        if(!this.card.description) {
          this.card.description = "No se ha proporcionado una descripción."
        }
        // se averigua la colección a la que pertenece
        this.collectionService.getCollection(card.collectionId!)
        .then((collection) => {
          this.collection = collection;
        })
        .catch((error) => {console.error(error);});
      })
      // también se recoge la información del vendedor
      .then(() => {
        this.userService.getUser(this.advert?.userId!)
        .then((user) => {
          this.seller = user;

          if(token){
            this.addressService.getAddress(user.addressId!)
            .then((address) => {
              console.log(address.city)
              this.city = address.city;
              this.province = address.province;
              this.country = address.country;
            })
            .catch((error) => {console.error(error);});
          }
        })
        .catch((error) => {console.error(error);});
      })
      .catch((error) => {console.error(error);});
    });
  }

  sendEmail(){
    let asunto = '';
    let cuerpo = '';
    if(this.advert?.price == 0){
      asunto = `CROMOTECA: Solicitud de intercambio para el elemento: ${this.card?.name!}`;
      cuerpo = `Yo, usuario de CROMOTECA ${this.seller?.username!} / ${this.seller?.firstName!}, 
      solicito un intercambio para el elemento: ${this.card?.name!} de la colección ${this.collection?.name!}.`;
    }
    else{
      asunto = `CROMOTECA: Solicitud de compra para el elemento: ${this.card?.name!}`;
      cuerpo = `Yo, usuario de CROMOTECA ${this.seller?.username!} / ${this.seller?.firstName!}, 
      quiero comprar el elemento: ${this.card?.name!} de la colección ${this.collection?.name!}.`;
    }

    const correo = `mailto:${this.seller?.email!}?subject=${asunto}&body=${cuerpo}`;
    window.location.href = correo;
  }

  goBack() {
    this.location.back();
  }
}
