import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarritoDetalleFrameComponent } from './carrito-detalle-frame.component';

describe('CarritoDetalleFrameComponent', () => {
  let component: CarritoDetalleFrameComponent;
  let fixture: ComponentFixture<CarritoDetalleFrameComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarritoDetalleFrameComponent]
    });
    fixture = TestBed.createComponent(CarritoDetalleFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
