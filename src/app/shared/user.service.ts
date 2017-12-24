import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ApiService } from './api.service';

import { RegisterPostAPIResponse } from '../portal/register/register-post-api-response.interface';
import { LoginGetAPIResponse } from '../portal/login/login-get-api-response';

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

	register(data: {}): Observable<RegisterPostAPIResponse> {
		return this.apiService.post('/users/register', data);
	}

	login(user: string, password: string): Observable<LoginGetAPIResponse> {
		return this.apiService.get('/auth/validateCredentials', { user: user, password: password });
	}

}

export interface UserExistsInterface {
	success: boolean;
	exists: boolean;
}