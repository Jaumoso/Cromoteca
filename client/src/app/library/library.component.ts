import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { mergeMap, switchMap } from 'rxjs';
import { IntermediateService } from '../services/intermediate.service';
import { JwtService } from '../services/jwt.service';
import { UserService } from '../services/user.service';
import { Collection } from '../shared/collection';
import { User } from '../shared/user';

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
  errmsg: string | undefined;
  gridColumns = 4; // cantdad de colecciones en una fila
  @Input() userId: any;

  ngOnInit() {
    if(this.userId != null) {
      this.intermediateService.getCollections(this.userId)
      .then((collections: Collection[]) => {
        this.collections = collections;
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

  deleteFromLibrary(collectionId: string){
    this.intermediateService.getIntermediate(this.userId)
    .then((intermediate) => {
/*       console.log(intermediate._id);
      console.log(intermediate.userId);
      console.log(intermediate.collectionId); */
      if(intermediate.collectionId != undefined){
        const index = intermediate.collectionId.indexOf(collectionId)
        if(index !== -1) {
          intermediate.collectionId?.splice(index, 1);
        }
      }
      if(intermediate._id != undefined){
        this.intermediateService.updateIntermediate(intermediate._id, intermediate)
        .then(() => console.log("Elemento borrado de la biblioteca."));
      }
    }
    )
    this.ngOnInit();
  }

}
