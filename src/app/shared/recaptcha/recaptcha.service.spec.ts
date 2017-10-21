import { TestBed, inject } from '@angular/core/testing';

import { RecaptchaService } from './recaptcha.service';

describe('RecaptchaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RecaptchaService]
    });
  });

  it('should be created', inject([RecaptchaService], (service: RecaptchaService) => {
    expect(service).toBeTruthy();
  }));
});
