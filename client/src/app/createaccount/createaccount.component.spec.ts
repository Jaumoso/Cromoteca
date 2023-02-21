import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialog } from '@angular/material/dialog';
import { CreateaccountComponent } from './createaccount.component';
import { MatFormFieldModule } from '@angular/material/form-field';

describe('CreateaccountComponent', () => {
  let component: CreateaccountComponent;
  let fixture: ComponentFixture<CreateaccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateaccountComponent ],
      imports: [ 
        FormsModule, 
        ReactiveFormsModule, 
        HttpClientTestingModule,
        MatFormFieldModule
      ],
      providers: [ 
        { provide: MatDialog, useValue: {}},
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateaccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
