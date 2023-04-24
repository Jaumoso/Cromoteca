import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute, Params } from '@angular/router';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { of } from 'rxjs';

import { FillCollectionComponent } from './fill-collection.component';
import { CollectionService } from '../services/collection.service';
import { JwtService } from '../services/jwt.service';
import { CardService } from '../services/card.service';
import { AddElementComponent } from '../add-element/add-element.component';
import { UserService } from '../services/user.service';

describe('FillCollectionComponent', () => {
  let component: FillCollectionComponent;
  let fixture: ComponentFixture<FillCollectionComponent>;
  let collectionService: CollectionService;
  let jwtService: JwtService;
  let userService: UserService;
  let cardService: CardService;
  let route: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FillCollectionComponent ],
      imports: [ 
        HttpClientTestingModule,
        MatDialogModule,
       ],
       providers: [
        { provide: CollectionService, useValue: { getCollection: jasmine.createSpy('getCollection').and.returnValue(of({ /* mock collection data */ })) } },
        { provide: JwtService, useValue: { decodeToken: jasmine.createSpy('decodeToken').and.returnValue({ _id: 'user_id' }) } },
        { provide: userService, useValue: { getUser: jasmine.createSpy('getUser').and.returnValue(Promise.resolve(/* mock user data */)) } },
        { provide: CardService, useValue: { getUserCardsCollection: jasmine.createSpy('getUserCardsCollection').and.returnValue(Promise.resolve(/* mock card data */)) } },
        { provide: ActivatedRoute, useValue: { paramMap: of({ get: (key: string) => 'collection_id' } as Params) } },
        { provide: userService, useValue: { getUser: jasmine.createSpy('getUser').and.returnValue(Promise.resolve(/* mock user data */)) } },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FillCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FillCollectionComponent);
    component = fixture.componentInstance;
    collectionService = TestBed.inject(CollectionService);
    jwtService = TestBed.inject(JwtService);
    userService = TestBed.inject(UserService);
    cardService = TestBed.inject(CardService);
    route = TestBed.inject(ActivatedRoute);
  });

  // it('should initialize component variables', () => {
  //   fixture.detectChanges();

  //   expect(collectionService.getCollection).toHaveBeenCalledWith('collection_id');
  //   expect(jwtService.decodeToken).toHaveBeenCalled();
  //   expect(userService.getIntermediate).toHaveBeenCalledWith('user_id');
  //   expect(cardService.getUserCardsCollection).toHaveBeenCalledWith('user_id', /* collection id from mock data */);

  //   expect(component.cardList.length).toBe(/* mock collection size */);
  //   expect(component.cards).toEqual(/* mock card data */);
  //   expect(component.completed).toBe(/* number of completed cards from mock data */);
  //   expect(component.missing).toBe(/* number of missing cards from mock data */);
  //   expect(component.percentage).toBe(/* percentage of completed cards from mock data */);
  //   expect(component.userId).toBe('user_id');
  // });

  it('should open the AddElementComponent dialog', () => {
    const dialogSpy = spyOn(TestBed.inject(MatDialog), 'open').and.returnValue({
      afterClosed: () => of('Some result')
    } as MatDialogRef<AddElementComponent>);
    component.addElement();
    expect(dialogSpy).toHaveBeenCalled();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
