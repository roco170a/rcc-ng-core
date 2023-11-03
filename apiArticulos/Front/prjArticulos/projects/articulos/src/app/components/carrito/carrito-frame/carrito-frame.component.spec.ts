import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarritoFrameComponent } from './carrito-frame.component';

describe('CarritoFrameComponent', () => {
  let component: CarritoFrameComponent;
  let fixture: ComponentFixture<CarritoFrameComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarritoFrameComponent]
    });
    fixture = TestBed.createComponent(CarritoFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
