import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { IntermediateService } from '../services/intermediate.service';
import { Collection } from '../shared/collection';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit {

  constructor(
    private intermediateService: IntermediateService
  ) { }

  collections: Collection[] = [];
  filteredCollections: Collection[] = [];
  errmsg: string = 'No se han encontrado colecciones!';
  gridColumns = 4; // cantdad de colecciones en una fila
  searchText: string = '';
  @Input() userId: any;

  ngOnInit() {
    if(this.userId != null) {
      this.intermediateService.getCollections(this.userId)
      .then((collections: Collection[]) => {
        this.collections = collections;
        this.filteredCollections = collections;
        console.log(this.collections);
      })
      .catch(err => this.errmsg = err);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes['userId']){
      this.ngOnInit();
    }
  }

  searchCollections(): Collection[] {
    // If no search text or category is provided, return all collections
    if (!this.searchText) {
      return this.collections;
    }
    // Filter the collections based on the search text and category
    return this.filteredCollections = this.collections.filter((collection) => {
      const isMatch = (str: string) =>
        str
        .toLowerCase()
        .normalize('NFD') // descomponer caracteres acentuados en componentes Unicode
        .replace(/[\u0300-\u036f]/g, '') // eliminar diacríticos mediante una expresión regular
        .includes(this.searchText.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')); // realizar comparación
      
      if(collection.name != undefined && collection.description != undefined){
        return (
          (!this.searchText || isMatch(collection.name) || isMatch(collection.description) || isMatch(collection.theme!) || isMatch(collection.format!) || isMatch(collection.year!.toString()))
        );
      }
      return this.collections;
    });
  }

  deleteFromLibrary(collection: Collection){
    this.intermediateService.getIntermediate(this.userId)
    .then((intermediate) => {
      if(intermediate.collectionId != undefined){
        const index = intermediate.collectionId.indexOf(collection._id!)
        if(index !== -1) {
          intermediate.collectionId.splice(index, 1);
        }
      }
      if(intermediate._id != undefined){
        this.intermediateService.updateIntermediate(intermediate._id, intermediate)
        .then(() => {
          
          const index = this.collections.indexOf(collection);
          this.collections.splice(index, 1);
          
        });
      }
    }
    )
  }

}
