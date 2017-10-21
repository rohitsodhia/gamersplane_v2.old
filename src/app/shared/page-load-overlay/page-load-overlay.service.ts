import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class PageLoadOverlayService {

	visibleSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);

	constructor() {}

	showOverlay() {
		this.visibleSubject.next(true);
	}

	hideOverlay() {
		this.visibleSubject.next(false);
	}

	getOverlayVisiblity(): Observable<boolean> {
		return this.visibleSubject.asObservable();
	}

}
