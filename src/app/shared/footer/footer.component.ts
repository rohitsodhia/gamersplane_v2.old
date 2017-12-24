import { Component, OnInit } from '@angular/core';
import { ReferralLinksService } from '../referral-links.service';

import { ReferralLink } from '../referral-link.interface';

@Component({
	selector: 'gp-footer',
	templateUrl: './footer.component.html',
	styleUrls: ['./footer.component.less']
})
export class FooterComponent implements OnInit {

	referralLinks: ReferralLink[] = [];

	constructor(
		private referralLinksService: ReferralLinksService
	) { }

	ngOnInit() {
		this.referralLinksService.get().subscribe(links => this.referralLinks = links);
	}

}
