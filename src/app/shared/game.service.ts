import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ApiService } from './api.service';

@Injectable()
export class GameService {

	constructor(
		private api: ApiService
	) { }

	get(options: {}): Observable<{}> {
		return this.api.get('/games', options);
	}

}
