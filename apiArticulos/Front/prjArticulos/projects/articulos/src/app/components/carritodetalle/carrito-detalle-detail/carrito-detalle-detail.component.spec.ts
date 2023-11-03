import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarritoDetalleDetailComponent } from './carrito-detalle-detail.component';

describe('CarritoDetalleDetailComponent', () => {
  let component: CarritoDetalleDetailComponent;
  let fixture: ComponentFixture<CarritoDetalleDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarritoDetalleDetailComponent]
    });
    fixture = TestBed.createComponent(CarritoDetalleDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
