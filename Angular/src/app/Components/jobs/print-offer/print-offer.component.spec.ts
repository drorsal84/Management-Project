import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintOfferComponent } from './print-offer.component';

describe('PrintOfferComponent', () => {
  let component: PrintOfferComponent;
  let fixture: ComponentFixture<PrintOfferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintOfferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
