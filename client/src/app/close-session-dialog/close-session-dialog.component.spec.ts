import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseSessionDialogComponent } from './close-session-dialog.component';

describe('CloseSessionDialogComponent', () => {
  let component: CloseSessionDialogComponent;
  let fixture: ComponentFixture<CloseSessionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CloseSessionDialogComponent ]
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
