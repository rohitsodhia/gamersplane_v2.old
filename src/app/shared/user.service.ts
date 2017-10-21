import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ApiService } from './api.service';

@Injectable()
export class UserService {

	constructor(private apiService: ApiService) { }

	emailExists(email: string): Observable<UserExistsInterface> {
		if (email.length === 0) {
			return Observable.of(null);
		}
		return this.apiService.get('/users/exists', { email: email });
	}

	usernameExists(username: string): Observable<UserExistsInterface> {
		if (username.length === 0) {
			return Observable.of(null);
		}
		return this.apiService.get('/users/exists', { username: username });
	}

	register(data: {}) {
		return this.apiService.post('/users/register', data);
	}

}

export interface UserExistsInterface {
	success: boolean;
	exists: boolean;
}