import { TestBed, inject } from '@angular/core/testing';

import { HbMarginService } from './hb-margin.service';

describe('HbMarginService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HbMarginService]
    });
  });

  it('should be created', inject([HbMarginService], (service: HbMarginService) => {
    expect(service).toBeTruthy();
  }));
});
