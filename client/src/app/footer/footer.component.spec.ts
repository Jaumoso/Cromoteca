import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { FooterComponent } from './footer.component';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { MatListModule } from '@angular/material/list';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FooterComponent ],
      providers: [ 
        { provide: MatDialog, useValue:{} },
        { provide: ActivatedRoute, useValue:{} },
      ],
      imports: [
        RouterModule,
        MatListModule,
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
