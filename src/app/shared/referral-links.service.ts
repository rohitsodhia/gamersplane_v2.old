import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';

import { ReferralLink } from './referral-link.interface';
import { ReferralLinksGetApiResponse } from './referral-links-get-api-response.interface';

import { ApiService } from './api.service';

@Injectable()
export class ReferralLinksService {

	constructor(
		private api: ApiService
	) { }

	get(): Observable<ReferralLink[]> {
		return this.api.get<ReferralLinksGetApiResponse>('/referralLinks')
			.map(response => {
				if (response.success) {
					return response.referralLinks;
				} else {
					return [];
				}
			});
	}

}
