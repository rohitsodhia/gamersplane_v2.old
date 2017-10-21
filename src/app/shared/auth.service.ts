import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';

import { ApiService } from './api.service';

import { User } from './user.interface';

@Injectable()
export class AuthService {

	private currentUser: BehaviorSubject<User> = new BehaviorSubject(null);

	constructor(
		private api: ApiService
	) { }

	validateToken() {
		return this.api
			.get('/auth/validateToken')
			.toPromise()
			.then((response: Response) => {
				if (response['success']) {
					return true;
				} else {
					return response['errors'];
				}
			});
	}

	loggedIn() {
		return this.currentUser.asObservable().map((user: User): boolean => user ? true : false);
	}

}
