import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { MatDialog } from '@angular/material/dialog';
import { LibraryComponent } from '../library/library.component';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileComponent, LibraryComponent],
      imports: [ 
        HttpClientTestingModule, 
      ],
      providers: [ 
        { provide: ActivatedRoute, useValue: {} },
        { provide: MatDialog, useValue: {} },
       ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
