import { TestBed } from '@angular/core/testing';

import { BuyMedia } from './buy-media.service';

describe('LoginService', () => {
  let service: BuyMedia;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuyMedia);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
