import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertdetailsComponent } from './advertdetails.component';

describe('AdvertdetailsComponent', () => {
  let component: AdvertdetailsComponent;
  let fixture: ComponentFixture<AdvertdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvertdetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdvertdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
