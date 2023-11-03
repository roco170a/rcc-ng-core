import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteArticuloFrameComponent } from './cliente-articulo-frame.component';

describe('ClienteArticuloFrameComponent', () => {
  let component: ClienteArticuloFrameComponent;
  let fixture: ComponentFixture<ClienteArticuloFrameComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClienteArticuloFrameComponent]
    });
    fixture = TestBed.createComponent(ClienteArticuloFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
