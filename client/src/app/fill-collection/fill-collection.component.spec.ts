import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { FillCollectionComponent } from './fill-collection.component';

describe('FillCollectionComponent', () => {
  let component: FillCollectionComponent;
  let fixture: ComponentFixture<FillCollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FillCollectionComponent ],
      imports: [ 
        HttpClientTestingModule,
       ],
      providers: [ 
        { provide: ActivatedRoute, useValue:{} },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(FillCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
