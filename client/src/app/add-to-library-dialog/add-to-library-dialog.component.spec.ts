import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { AddToLibraryComponent } from './add-to-library-dialog.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AddToLibraryComponent', () => {
  let component: AddToLibraryComponent;
  let fixture: ComponentFixture<AddToLibraryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddToLibraryComponent ],
      imports: [ HttpClientTestingModule ],
      providers: [
        { provide: MatDialogRef, useValue: {}},
        { provide: MAT_DIALOG_DATA, useValue: {}},
        { provide: MatDialog, useValue: {}},
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddToLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
