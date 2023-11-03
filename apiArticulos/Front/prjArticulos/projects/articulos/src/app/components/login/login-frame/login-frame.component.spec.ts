import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginFrameComponent } from './login-frame.component';

describe('LoginFrameComponent', () => {
  let component: LoginFrameComponent;
  let fixture: ComponentFixture<LoginFrameComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginFrameComponent]
    });
    fixture = TestBed.createComponent(LoginFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
