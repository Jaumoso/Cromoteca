import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CollectiondetailsComponent } from './collectiondetails.component';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

describe('CollectiondetailsComponent', () => {
  let component: CollectiondetailsComponent;
  let fixture: ComponentFixture<CollectiondetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollectiondetailsComponent ],
      imports: [ HttpClientTestingModule ],
      providers: [ 
        { provide: ActivatedRoute, useValue: {} },
        { provide: MatDialog, useValue: {} },
       ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollectiondetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
