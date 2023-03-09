import { Component, OnInit } from '@angular/core';
import { AdvertService } from '../services/advert.service';
import { JwtService } from '../services/jwt.service';
import { UserService } from '../services/user.service';
import { Advert } from '../shared/advert';

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.scss']
})
export class MarketComponent implements OnInit {

  constructor(
    private advertService: AdvertService,
    private userService: UserService
    ) { }

    ngOnInit() {
      this.advertService.getAdverts()
      .subscribe((adverts) => {
        this.adverts = adverts;
        this.userService.getUser(adverts.)

      })
    }

  searchText: string = '';
  adverts: Advert[] = [];
  filteredAdverts: Advert[] = [];
  gridColumns = 4; // ! cantdad de anuncios en una fila CAMBIAR ESTO

  searchAdverts(): Advert[] {
    // If no search text or category is provided, return all advers
    if (!this.searchText) {
      return this.adverts;
    }
    // Filter the adverts based on the search text and category
    return this.filteredAdverts = this.adverts.filter((advert) => {
      const isMatch = (str: string) =>
        str
        .toLowerCase()
        .normalize('NFD') // descomponer caracteres acentuados en componentes Unicode
        .replace(/[\u0300-\u036f]/g, '') // eliminar diacríticos mediante una expresión regular
        .includes(this.searchText.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')); // realizar comparación
      // TODO: completar
/*       if(collection.name != undefined && collection.description != undefined){
        return (
          (!this.searchText || isMatch(collection.name) || isMatch(collection.description) || isMatch(collection.theme!) || isMatch(collection.format!) || isMatch(collection.year!.toString()))
        );
      } */
      return this.adverts;
    });
  }

}
