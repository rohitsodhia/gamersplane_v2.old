import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { switchMap } from 'rxjs/operators/switchMap';
import { takeUntil } from 'rxjs/operators/takeUntil';
import { distinctUntilChanged } from 'rxjs/operators/distinctUntilChanged';
import { map } from 'rxjs/operators/map';

import { ApiService } from 'app/shared/api.service';
import { AuthService } from 'app/shared/auth.service';

import { APIResponse } from 'app/shared/api-response.interface';

@Injectable()
export class PMService {

	private pmCountRefresh: number = 1000 * 60 * 5;
	private pmCountAPI$: Observable<number>;
	private pmCount$: Observable<number>;

	constructor(
		private api: ApiService,
		private authService: AuthService
	) {
		this.pmCountAPI$ = this.api.get('/pms', { count: true }).pipe(
			map((data: pmCountGetAPIResponse) => data.data.count)
		);
		this.pmCount$ = this.authService.getUser().pipe(
			distinctUntilChanged(),
			switchMap(user => {
				if (user) {
					return Observable.timer(this.pmCountRefresh, this.pmCountRefresh).pipe(
						switchMap(() => this.pmCountAPI$)
					)
				} else {
					return Observable.of(null);
				}
			})
		).publishReplay(1).refCount();
	}

	getInitialPMCount() {
		return this.pmCountAPI$.toPromise();
	}

	getPMCount() {
		return this.pmCount$;
	}

}

export interface pmCountGetAPIResponse extends APIResponse {
	data: {
		count: number;
	}
}