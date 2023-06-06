import { TestBed } from '@angular/core/testing';

import { HotelDetailsGuardGuard } from './hotel-details-guard.guard';

describe('HotelDetailsGuardGuard', () => {
  let guard: HotelDetailsGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(HotelDetailsGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
