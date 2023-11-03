import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarritoDetailComponent } from './carrito-detail.component';

describe('CarritoDetailComponent', () => {
  let component: CarritoDetailComponent;
  let fixture: ComponentFixture<CarritoDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarritoDetailComponent]
    });
    fixture = TestBed.createComponent(CarritoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
