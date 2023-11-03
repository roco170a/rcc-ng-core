import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteArticuloDetailComponent } from './cliente-articulo-detail.component';

describe('ClienteArticuloDetailComponent', () => {
  let component: ClienteArticuloDetailComponent;
  let fixture: ComponentFixture<ClienteArticuloDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClienteArticuloDetailComponent]
    });
    fixture = TestBed.createComponent(ClienteArticuloDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
