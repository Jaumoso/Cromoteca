import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveFromLibraryDialogComponent } from './remove-from-library-dialog.component';

describe('RemoveFromLibraryDialogComponent', () => {
  let component: RemoveFromLibraryDialogComponent;
  let fixture: ComponentFixture<RemoveFromLibraryDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemoveFromLibraryDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemoveFromLibraryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
