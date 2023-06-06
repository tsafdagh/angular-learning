import { TestBed } from '@angular/core/testing';

import { HotelListServiceService } from './hotel-list.service';

describe('HotelListServiceService', () => {
  let service: HotelListServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HotelListServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
