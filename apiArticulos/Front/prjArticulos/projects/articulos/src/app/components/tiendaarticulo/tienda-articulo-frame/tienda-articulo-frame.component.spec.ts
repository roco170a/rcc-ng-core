import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiendaArticuloFrameComponent } from './tienda-articulo-frame.component';

describe('TiendaArticuloFrameComponent', () => {
  let component: TiendaArticuloFrameComponent;
  let fixture: ComponentFixture<TiendaArticuloFrameComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TiendaArticuloFrameComponent]
    });
    fixture = TestBed.createComponent(TiendaArticuloFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
