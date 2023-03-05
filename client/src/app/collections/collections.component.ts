import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddToLibraryComponent } from '../add-to-library-dialog/add-to-library-dialog.component';
import { CollectionService } from '../services/collection.service';
import { IntermediateService } from '../services/intermediate.service';
import { JwtService } from '../services/jwt.service';
import { Collection } from '../shared/collection';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.scss'],
})
export class CollectionsComponent implements OnInit {

  constructor(
    private collectionService: CollectionService,
    public dialog: MatDialog,
    private intermediateService: IntermediateService,
    private jwtService: JwtService,
    ) { }

  collections: Collection[] = [];
  filteredCollections: Collection[] = [];
  errmsg: string = 'No se han encontrado colecciones!';
  gridColumns = 4; // cantdad de colecciones en una fila
  searchText: string = '';
  collectionIds: string[] = [];

  ngOnInit() {

    const token = localStorage.getItem('token');
    if(token){
      const decodedToken = this.jwtService.decodeToken(token);
      this.intermediateService.getIntermediate(decodedToken._id)
      .then((intermediate) => {
        this.collectionIds = intermediate.collectionId!
      })
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

  openDialog(id: number):void {
    const dialogRef = this.dialog.open(AddToLibraryComponent, {
      data: { collectionName: this.collections[id].name, collectionId: this.collections[id]._id }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.collectionIds.push(result.collectionId);
    });
  }
}