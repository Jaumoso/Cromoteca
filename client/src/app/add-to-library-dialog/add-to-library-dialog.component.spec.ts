import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToLibraryDialogComponent } from './add-to-library-dialog.component';

describe('AddToLibraryDialogComponent', () => {
  let component: AddToLibraryDialogComponent;
  let fixture: ComponentFixture<AddToLibraryDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddToLibraryDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddToLibraryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
