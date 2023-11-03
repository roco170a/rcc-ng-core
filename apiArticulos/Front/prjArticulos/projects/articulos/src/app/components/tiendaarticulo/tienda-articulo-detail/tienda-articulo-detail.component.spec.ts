import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiendaArticuloDetailComponent } from './tienda-articulo-detail.component';

describe('TiendaArticuloDetailComponent', () => {
  let component: TiendaArticuloDetailComponent;
  let fixture: ComponentFixture<TiendaArticuloDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TiendaArticuloDetailComponent]
    });
    fixture = TestBed.createComponent(TiendaArticuloDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
