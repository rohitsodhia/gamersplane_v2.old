import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class PortalModalService {

	state: BehaviorSubject<string> = new BehaviorSubject('');

	constructor() { }

	setState(state: string) {
		this.state.next(state);
	}

	getState(): Observable<string> {
		return this.state.asObservable();
	}

}
