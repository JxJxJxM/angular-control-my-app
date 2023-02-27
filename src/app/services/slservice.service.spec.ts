import { TestBed } from '@angular/core/testing';

import { SLServiceService } from './slservice.service';

describe('SLServiceService', () => {
  let service: SLServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SLServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
