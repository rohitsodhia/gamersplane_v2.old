import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class ScreenWidthService {

	private screenWidth$: Observable<number>;

	constructor() {
		this.screenWidth$ = Observable.fromEvent<Event>(window, 'resize')
			.map(event => event.target['innerWidth'])
			.publishBehavior(window.innerWidth)
			.refCount();
	}

	get() {
		return this.screenWidth$;
	}

}
