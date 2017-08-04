import { Injectable } from '@angular/core';

import { Observable, BehaviorSubject } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { ApiService } from './api.service';

import { User } from './user';

@Injectable()
export class AuthService {

	private currentUser: BehaviorSubject<User> = new BehaviorSubject(null);

	constructor(apiService: ApiService) { }

	loggedIn() {
		return this.currentUser.asObservable().map((user: User): boolean => user ? true : false);
	}

}
