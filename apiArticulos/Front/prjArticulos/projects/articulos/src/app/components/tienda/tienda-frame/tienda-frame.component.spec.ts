import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiendaFrameComponent } from './tienda-frame.component';

describe('TiendaFrameComponent', () => {
  let component: TiendaFrameComponent;
  let fixture: ComponentFixture<TiendaFrameComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TiendaFrameComponent]
    });
    fixture = TestBed.createComponent(TiendaFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
