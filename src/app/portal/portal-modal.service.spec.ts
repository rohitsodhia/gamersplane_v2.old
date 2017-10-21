import { TestBed, inject } from '@angular/core/testing';

import { PortalModalService } from './portal-modal.service';

describe('PortalModalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PortalModalService]
    });
  });

  it('should be created', inject([PortalModalService], (service: PortalModalService) => {
    expect(service).toBeTruthy();
  }));
});
