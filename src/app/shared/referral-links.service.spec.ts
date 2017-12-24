import { TestBed, inject } from '@angular/core/testing';

import { ReferralLinksService } from './referral-links.service';

describe('ReferralLinksService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReferralLinksService]
    });
  });

  it('should be created', inject([ReferralLinksService], (service: ReferralLinksService) => {
    expect(service).toBeTruthy();
  }));
});
