import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { OverlayModule } from '@angular/cdk/overlay';


import { CollectiondetailsComponent } from './collectiondetails.component';
import { CollectionService } from '../services/collection.service';
import { JwtService } from '../services/jwt.service';
import { IntermediateService } from '../services/intermediate.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CollectiondetailsComponent', () => {
  let component: CollectiondetailsComponent;
  let fixture: ComponentFixture<CollectiondetailsComponent>;
  let collectionServiceSpy: jasmine.SpyObj<CollectionService>;
  let jwtServiceSpy: jasmine.SpyObj<JwtService>;
  let intermediateServiceSpy: jasmine.SpyObj<IntermediateService>;
  let activatedRoute: ActivatedRoute;
  let dialog: MatDialog;

  const collectionData = {
      _id: "63c44b27b43d0362aa92534d",
      name: "Pokémon Stacks 2006",
      format: "STAKS",
      theme: "POKÉMON",
      description: "Pokémon Stacks collection from the year 2006, collection of magnets with the Pokémon Pokédex.",
      year: 2006,
      publisher: "Panini",
      languaje: "English",
      image: "https://pokemania.es/img/collection/checklist-pokemon-staks-2006/1.jpg",
      size: 240,
      language: "Español"
  };

  beforeEach(async () => {
    const collectionSpy = jasmine.createSpyObj('CollectionService', ['getCollection']);
    const jwtSpy = jasmine.createSpyObj('JwtService', ['decodeToken']);
    const intermediateSpy = jasmine.createSpyObj('IntermediateService', ['getIntermediate']);

    await TestBed.configureTestingModule({
      declarations: [ CollectiondetailsComponent ],
      imports: [ HttpClientTestingModule,  OverlayModule, MatDialogModule ],
      providers: [
        { provide: CollectionService, useValue: collectionSpy },
        { provide: JwtService, useValue: jwtSpy },
        { provide: IntermediateService, useValue: intermediateSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(convertToParamMap({ id: 'collection-id' }))
          }
        },
        MatDialog
      ]
    })
    .compileComponents();

    dialog = TestBed.inject(MatDialog);
    fixture = TestBed.createComponent(CollectiondetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the collection property', () => {
    expect(component.collection).toEqual(collectionData);
  });

  it('should call decodeToken with the token from localStorage', () => {
    expect(jwtServiceSpy.decodeToken).toHaveBeenCalledWith('token-value');
  });

  it('should call getIntermediate with the user id', () => {
    expect(intermediateServiceSpy.getIntermediate).toHaveBeenCalledWith('user-id');
  });

  it('should set the collectionIds property', async () => {
    await fixture.whenStable();
    expect(component.collectionIds).toEqual(['collection-id']);
  });

  it('should create', () => {
    expect(dialog).toBeTruthy();
  });
});
