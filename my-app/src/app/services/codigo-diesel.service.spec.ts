import { TestBed } from '@angular/core/testing';

import { CodigoDieselService } from './codigo-diesel.service';

describe('CodigoDieselService', () => {
  let service: CodigoDieselService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CodigoDieselService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
