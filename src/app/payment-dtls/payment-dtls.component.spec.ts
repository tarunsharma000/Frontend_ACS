import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentDtlsComponent } from './payment-dtls.component';

describe('PaymentDtlsComponent', () => {
  let component: PaymentDtlsComponent;
  let fixture: ComponentFixture<PaymentDtlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentDtlsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentDtlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
