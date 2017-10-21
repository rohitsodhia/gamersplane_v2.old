import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs/Rx';

@Injectable()
export class RootClassesService {

	classes: BehaviorSubject<string[]> = new BehaviorSubject([]);

	constructor() { }

	set(classes: string[]) {
		this.classes.next(classes);
	}

	watch(): Observable<string[]> {
		return this.classes.asObservable();
	}

}
