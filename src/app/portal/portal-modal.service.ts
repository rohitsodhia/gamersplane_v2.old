import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { ModalService } from '../shared/modal/modal.service';

@Injectable()
export class PortalModalService {

	state: BehaviorSubject<'register' | 'registerSuccess' | 'login'> = new BehaviorSubject(null);

	constructor(
		private modalService: ModalService
	) { }

	setState(state: 'register' | 'registerSuccess' | 'login') {
		this.state.next(state);
	}

	getState(): Observable<string> {
		return this.state.asObservable();
	}

	openPortal(state: 'register' | 'login') {
		this.setState(state);
		this.modalService.openModal('portal');
	}

}
