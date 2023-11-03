import { TestBed } from '@angular/core/testing';

import { DbArticulosService } from './db-articulos.service';

describe('DbArticulosService', () => {
  let service: DbArticulosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DbArticulosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
