import { Component, OnInit, ViewChild } from '@angular/core';

import { RecaptchaService } from '../recaptcha.service';

@Component({
	selector: 'rs-recaptcha',
	templateUrl: './recaptcha.component.html',
	styleUrls: ['./recaptcha.component.less']
})
export class RecaptchaComponent implements OnInit {

	@ViewChild('container') container;

	constructor(
		private recaptchaService: RecaptchaService
	) { }

	ngOnInit() {
		console.log(this.container);
		// this.recaptchaService.isReady().subscribe((ready) => {
		// 	if (ready) {
		// 		this.setup();
		// 	}
		// });
	}

	setup() {
		// grecaptcha.render('html_element', {
		// 	'sitekey': 'your_site_key'
		// });
	}

}
