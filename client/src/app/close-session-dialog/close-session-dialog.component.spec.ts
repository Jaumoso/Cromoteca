import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CloseSessionDialogComponent } from './close-session-dialog.component';

describe('CloseSessionDialogComponent', () => {
  let component: CloseSessionDialogComponent;
  let fixture: ComponentFixture<CloseSessionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CloseSessionDialogComponent ],
      providers: [
        { provide: MatDialogRef, useValue: {}},
        { provide: MAT_DIALOG_DATA, useValue: {}}
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(CloseSessionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
