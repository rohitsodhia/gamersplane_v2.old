import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

interface Window {
	ngrecaptchaloaded: () => void;
}

@Injectable()
export class RecaptchaService {

	ready: BehaviorSubject<ReCaptchaV2.ReCaptcha> = new BehaviorSubject(null);

	constructor() {
		window.ngrecaptchaloaded = () => {
			console.log(grecaptcha);
			this.ready.next(window['grecaptcha']);
		}
	}

	isReady(): Observable<ReCaptchaV2.ReCaptcha> {
		return this.ready.asObservable();
	}

}
