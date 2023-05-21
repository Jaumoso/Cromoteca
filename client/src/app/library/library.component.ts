import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RemoveFromLibraryDialogComponent } from '../remove-from-library-dialog/remove-from-library-dialog.component';
import { CardService } from '../services/card.service';
import { Collection } from '../shared/collection';
import { UserService } from '../services/user.service';
import { AdvertService } from '../services/advert.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit {

  constructor(
    private cardService: CardService,
    private userService: UserService,
    private advertService: AdvertService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  collections: Collection[] = [];
  filteredCollections: Collection[] = [];
  errmsg: string = 'No se han encontrado colecciones!';
  gridColumns = 4; // cantdad de colecciones en una fila
  searchText: string = '';
  completed: number[] = [];
  @Input() userId: any;

  ngOnInit() {
    if(this.userId != null) {
      this.userService.getCollections(this.userId)
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
        return (!this.searchText || isMatch(collection.name) || isMatch(collection.description) || isMatch(collection.theme!) || isMatch(collection.format!) || isMatch(collection.year!.toString()));
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
        // obtener cartas del usuario
        this.cardService.getUserCardsCollection(this.userId, collection._id!)
        .subscribe(cards => {
          cards.forEach(card => {
            // borrar los anuncios
            this.advertService.deleteAdvertCard(card._id!).subscribe(data => {
              console.log(data);
            });
          });
        });
      
        // borrar elementos de la colección
        this.cardService.deleteCardsFromCollection(this.userId, collection._id!)
          .then(() => {
            // se recupera la información del usuario
            this.userService.getUser(this.userId).then((user) => {
              const index = user.collectionId!.indexOf(collection._id!);
              if(index !== -1) {
                // se cambia la información en el intermediate
                user.collectionId!.splice(index, 1);
                // se actualiza la información del user
                this.userService.updateUserContent(user._id!, user)
                .then(() => {
                  // se borra la colección del array de colecciones local
                  const index = this.collections.indexOf(collection);
                  this.collections.splice(index, 1);
                })
                .catch((error) => {console.error(error);});
              }
            })
            .catch((error) => {console.error(error);});
          })
          .then(() => {
            this.snackBar.open(
              "Colección borrada de la biblioteca", 
              "Aceptar",
              {
                verticalPosition: 'top',
                duration: 6000,
                panelClass: ['snackbar']
              }
              );
          })
          .catch((error) => {console.error(error);});
      }
    });
  }

}
