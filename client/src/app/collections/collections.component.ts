import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddToLibraryComponent } from '../add-to-library-dialog/add-to-library-dialog.component';
import { CollectionService } from '../services/collection.service';
import { JwtService } from '../services/jwt.service';
import { Collection } from '../shared/collection';
import { UserService } from '../services/user.service';
import { RemoveFromLibraryDialogComponent } from '../remove-from-library-dialog/remove-from-library-dialog.component';
import { CardService } from '../services/card.service';
import { AdvertService } from '../services/advert.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.scss'],
})
export class CollectionsComponent implements OnInit {

  constructor(
    private collectionService: CollectionService,
    public dialog: MatDialog,
    private userService: UserService,
    private jwtService: JwtService,
    private cardService: CardService,
    private advertService: AdvertService,
    private snackBar: MatSnackBar
    ) { }

  collections: Collection[] = [];
  filteredCollections: Collection[] = [];
  errmsg: string = 'No se han encontrado colecciones!';
  gridColumns = 4; // cantdad de colecciones en una fila
  searchText: string = '';
  collectionIds: string[] = [];
  private decodedToken: any;

  ngOnInit() {

    const token = localStorage.getItem('token');
    if(token){
      this.decodedToken = this.jwtService.decodeToken(token);
      this.userService.getUser(this.decodedToken._id)
      .then((user) => {
        this.collectionIds = user.collectionId!
      })
      .catch((error) => {console.error(error);});
    }
    this.collectionService.getCollections()
    .subscribe(collections => {
      this.collections = collections;
      this.filteredCollections = collections;
    });
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

  addToLibrary(id: number):void {
    const dialogRef = this.dialog.open(AddToLibraryComponent, {
      data: { collectionName: this.collections[id].name, collectionId: this.collections[id]._id }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.collectionIds.push(result.collectionId);

      this.snackBar.open(
        "Colección guardada en la biblioteca", 
        "Aceptar",
        {
          verticalPosition: 'top',
          duration: 6000,
          panelClass: ['snackbar']
        }
        );
    });
  }

  deleteFromLibrary(id: number):void {
    const dialogRef = this.dialog.open(RemoveFromLibraryDialogComponent, {
      data: { deleteCollection: false, collectionName: this.collections[id].name }
    });

   // tras cerrar el diálogo ...
   dialogRef.afterClosed().subscribe(result => {
    // si se le ha dado a OK
    if(result.deleteCollection) {
      // obtener cartas del usuario
      this.cardService.getUserCardsCollection(this.decodedToken._id, this.collections[id]._id!)
      .subscribe(cards => {
        cards.forEach(card => {
          // borrar los anuncios
          this.advertService.deleteAdvertCard(card._id!).subscribe(data => {
            console.log(data);
          });
        });
      });
    
      // borrar elementos de la colección
      this.cardService.deleteCardsFromCollection(this.decodedToken._id, this.collections[id]._id!)
        .then(() => {
          // se recupera la información del usuario
          this.userService.getUser(this.decodedToken._id).then((user) => {
            const index = user.collectionId!.indexOf(this.collections[id]._id!);
            if(index !== -1) {
              // se cambia la información del array colecciones de la biblioteca
              user.collectionId!.splice(index, 1);
              // se actualiza la información del user
              this.userService.updateUserContent(user._id!, user)
              .then(() => {
                this.ngOnInit();
              })
              .catch((error) => {console.error(error);});
            }
          })
          .catch((error) => {console.error(error);});
        })
        .catch((error) => {console.error(error);});
    }
  }).add(() => {
    this.snackBar.open(
      "Colección borrada de la biblioteca", 
      "Aceptar",
      {
        verticalPosition: 'top',
        duration: 6000,
        panelClass: ['snackbar']
      }
      );
  });
  }
}