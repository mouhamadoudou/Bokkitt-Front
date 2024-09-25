import { TestBed } from '@angular/core/testing';

import { TmpTripDataService } from './tmp-trip-data.service';

describe('TmpTripDataService', () => {
  let service: TmpTripDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TmpTripDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
