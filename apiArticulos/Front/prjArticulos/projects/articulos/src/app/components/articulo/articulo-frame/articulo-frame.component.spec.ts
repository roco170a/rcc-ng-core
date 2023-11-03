import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticuloFrameComponent } from './articulo-frame.component';

describe('ArticuloFrameComponent', () => {
  let component: ArticuloFrameComponent;
  let fixture: ComponentFixture<ArticuloFrameComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArticuloFrameComponent]
    });
    fixture = TestBed.createComponent(ArticuloFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
