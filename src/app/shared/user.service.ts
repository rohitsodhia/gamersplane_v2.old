import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ApiService } from 'app/shared/api.service';

import { UserExistsGetApiResponse } from 'app/shared/user-exists-get-api-response.interface';
import { RegisterPostAPIResponse } from 'app/portal/register/register-post-api-response.interface';

@Injectable()
export class UserService {

	private defaultAvatar: string = '/assets/images/avatar.png';

	constructor(private api: ApiService) { }

	userExists(field: string, value: string): Observable<boolean> {
		if ((field !== 'username' && field !== 'email') || value.length === 0) {
			return Observable.of(null);
		}
		return this.api
			.get<UserExistsGetApiResponse>('/users/exists', { field: field, value: value })
			.map(response => response.data.exists);
	}

	register(details: {email: string, username: string, password: string, recaptcha: string}): Observable<RegisterPostAPIResponse> {
		return this.api.post('/users/register', details);
	}

	getAvatar(url: string) {
		return url ? url : this.defaultAvatar;
	}

}
