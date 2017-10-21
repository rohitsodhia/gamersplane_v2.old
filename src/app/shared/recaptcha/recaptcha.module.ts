import { NgModule, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecaptchaService } from './recaptcha.service';

import { RecaptchaComponent } from './recaptcha/recaptcha.component';

@NgModule({
	imports: [
		CommonModule
	],
	declarations: [
		RecaptchaComponent
	],
	exports: [
		RecaptchaComponent
	],
	providers: [
		{
			provide: APP_INITIALIZER,
			useFactory: loadRecaptchaJS,
			deps: [],
			multi: true
		},
		RecaptchaService
	]
})
export class RecaptchaModule { }

export function loadRecaptchaJS() {
	return () => {
		let recaptchaScript = document.getElementById('rs-recaptcha');
		if (!recaptchaScript) {
			let head = document.getElementsByTagName('head')[0],
				script = document.createElement('script') as HTMLScriptElement;
			script.id = 'rs-recaptcha';
			script.src = 'https://www.google.com/recaptcha/api.js?render=explicit&onload=ngrecaptchaloaded';
			script.defer = true;
			script.async = true;
			head.appendChild(script);
		}
	};
}
