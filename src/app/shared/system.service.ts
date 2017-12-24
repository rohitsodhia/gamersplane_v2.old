import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';

import { System } from './system.interface';

import { ApiService } from './api.service';

@Injectable()
export class SystemService {

	private systems: System[] = []

	constructor(
		private api: ApiService
	) { }

	get(systems?: string[], options?: {}): Observable<System[]> {
		if (
			this.systems.length === 0 ||
			systems !== undefined && (
				systems.some((system) => !this.systems.find((eSystem) => system === eSystem._id)) ||
				systems.some((system) => this.systems.find((eSystem) => system === eSystem._id).publisher === undefined)
			)
		) {
			if (options === undefined) {
				options = [];
			}
			if (systems === undefined || systems.length === 0) {
				options['all'] = true;
			} else {
				options['systems'] = systems.join(',');
			}
			return this.api.get('/systems', options)
				.map(response => {
					if (response['success']) {
						for (let system in response['systems']) {
							this.systems[system] = response['systems'][system];
						}
						return response['systems'];
					} else {
						return {};
					}
				});
		} else {
			return Observable.of(this.systems);
		}
	}

	initLoad() {
		return this.get([], {
				basic: true
			})
			.toPromise()
			.then(() => true)
			.catch(error => console.log(error));
	}

}
