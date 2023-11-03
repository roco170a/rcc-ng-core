import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteFrameComponent } from './cliente-frame.component';

describe('ClienteFrameComponent', () => {
  let component: ClienteFrameComponent;
  let fixture: ComponentFixture<ClienteFrameComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClienteFrameComponent]
    });
    fixture = TestBed.createComponent(ClienteFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
