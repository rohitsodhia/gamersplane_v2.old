import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';

import * as jwtDecode from 'jwt-decode';

import { ApiService } from 'app/shared/api.service';
import { RegisterPostAPIResponse } from 'app/portal/register/register-post-api-response.interface';
import { LoginPostAPIResponse } from 'app/portal/login/login-post-api-response';
import { UserService } from 'app/shared/user.service';

import { User } from './user.interface';

@Injectable()
export class AuthService {

	private currentUser: BehaviorSubject<User> = new BehaviorSubject(null);

	constructor(
		private api: ApiService,
		private userService: UserService
	) { }

	register(data: {}): Observable<RegisterPostAPIResponse> {
		return this.api
			.post('/users/register', data);
	}

	login(login: string, password: string): Observable<boolean> {
		return this.api
			.post<LoginPostAPIResponse>('/auth/validateCredentials', { login: login, password: password })
			.map(response => {
				if (response.data) {
					localStorage.setItem('jwt', response.data.jwt);
				} else {
					localStorage.removeItem('jwt');
				}
				this.validateToken();
				return !!response.data;
			});
	}

	logout() {
		localStorage.removeItem('jwt');
		this.currentUser.next(null);
	}

	validateToken() {
		let jwt: string = localStorage.getItem('jwt');
		if (jwt && jwt.length) {
			let decoded: UserJWT = jwtDecode(jwt);
			this.currentUser.next({
				userId: decoded.userId,
				username: decoded.username,
				avatar: this.userService.getAvatar(decoded.avatar)
			});
		} else {
			this.currentUser.next(null);
		}
	}

	getUser(): Observable<User> {
		return this.currentUser.asObservable();
	}

	loggedIn(): Observable<boolean> {
		return this.getUser().map(user => user ? true : false);
	}

}

export interface UserJWT extends User {
	iss: string,
	iat: number,
	exp: number,
}
