import { TestBed, inject } from '@angular/core/testing';

import { PageLoadOverlayService } from './page-load-overlay.service';

describe('PageLoadOverlayService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PageLoadOverlayService]
    });
  });

  it('should be created', inject([PageLoadOverlayService], (service: PageLoadOverlayService) => {
    expect(service).toBeTruthy();
  }));
});
