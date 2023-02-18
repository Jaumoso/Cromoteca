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
    if (this.searchText == undefined) {
      return this.filteredCollections = this.collections;
    }
    // Filter the collections based on the search text and category
    return this.filteredCollections = this.collections.filter((collection) => {
      const isMatch = (str: string) =>
        str.toLowerCase().includes(this.searchText.toLowerCase());
      
      if(collection.name != undefined && collection.description != undefined){
        return (
          (!this.searchText || isMatch(collection.name) || isMatch(collection.description) || isMatch(collection.year!.toString()))
        );
      }
      return this.collections;
    });
  }

  deleteFromLibrary(collectionId: string){
    this.intermediateService.getIntermediate(this.userId)
    .then((intermediate) => {
      if(intermediate.collectionId != undefined){
        const index = intermediate.collectionId.indexOf(collectionId)
        if(index !== -1) {
          intermediate.collectionId.splice(index, 1);
        }
      }
      if(intermediate._id != undefined){
        this.intermediateService.updateIntermediate(intermediate._id, intermediate)
        .then(() => console.log("Elemento borrado de la biblioteca."));
      }
    }
    )
  }

}
