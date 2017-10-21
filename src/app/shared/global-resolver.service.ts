import { Injectable } from '@angular/core';
import { Router, ResolveStart } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

import * as utils from '../../utils';

@Injectable()
export class GlobalResolverService {

	events$: Subscription;
	functions: {[key: string]: ((any) => any)} = {};

	constructor(
		private router: Router
	) { }

	init() {
		this.events$ = this.router.events
			.filter(event => event instanceof ResolveStart)
			.subscribe(event => { console.log(event) });
	}

	add(func: ((any) => any), key: string = null) {
		if (this.events$ === null) {
			this.init();
		}
		if (key === null) {
			key = utils.randomStr();
		}
		this.functions[key] = func;
	}

	remove(key: string) {
		delete this.functions[key];
	}

}
