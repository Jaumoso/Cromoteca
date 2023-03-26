import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RemoveFromLibraryDialogComponent } from '../remove-from-library-dialog/remove-from-library-dialog.component';
import { CardService } from '../services/card.service';
import { IntermediateService } from '../services/intermediate.service';
import { Collection } from '../shared/collection';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit {

  constructor(
    private intermediateService: IntermediateService,
    private cardService: CardService,
    private dialog: MatDialog
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
    const filteredCollections = this.collections.filter((collection) => {
      const isMatch = (str: string) =>
        str
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .includes(this.searchText.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')); 
      
      if(collection.name != undefined && collection.description != undefined){
        return (
          (!this.searchText || isMatch(collection.name) || isMatch(collection.description) || isMatch(collection.theme!) || isMatch(collection.format!) || isMatch(collection.year!.toString()))
        );
      }
      return this.collections;
    });
    
    this.filteredCollections = filteredCollections;
    return filteredCollections;
}

  deleteFromLibrary(collection: Collection) {
    // se abre el diálogo
    const dialogRef = this.dialog.open(RemoveFromLibraryDialogComponent, {
      data: { deleteCollection: false, collectionName: collection.name }
    });
    
    // tras cerrar el diálogo ...
    dialogRef.afterClosed().subscribe(result => {
      // si se le ha dado a OK
      if(result.deleteCollection) {
        // borrar elementos de la colección
        this.cardService.deleteCardsFromCollection(this.userId, collection._id!)
          .then(() => {
            // se recupera la información del intermediate
            this.intermediateService.getIntermediate(this.userId).then((intermediate) => {
              const index = intermediate.collectionId!.indexOf(collection._id!);
              if(index !== -1) {
                // se cambia la información en el intermediate
                intermediate.collectionId!.splice(index, 1);
                // se actualiza la tabla intermediate
                this.intermediateService.updateIntermediate(intermediate._id!, intermediate)
                  .then(() => {
                    // se borra la colección del array de colecciones local
                    const index = this.collections.indexOf(collection);
                    this.collections.splice(index, 1);
                  });
              }
            });
          });
      }
    });
  }

}
