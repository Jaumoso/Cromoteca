import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FillCollectionComponent } from './fill-collection.component';

describe('FillCollectionComponent', () => {
  let component: FillCollectionComponent;
  let fixture: ComponentFixture<FillCollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FillCollectionComponent ]
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
