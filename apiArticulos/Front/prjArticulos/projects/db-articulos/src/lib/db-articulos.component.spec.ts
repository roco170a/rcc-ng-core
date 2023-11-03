import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DbArticulosComponent } from './db-articulos.component';

describe('DbArticulosComponent', () => {
  let component: DbArticulosComponent;
  let fixture: ComponentFixture<DbArticulosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DbArticulosComponent]
    });
    fixture = TestBed.createComponent(DbArticulosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
