import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';

interface Window {
	overlayKeypress: () => void;
}

@Injectable()
export class ModalService {

	open: boolean = false;
	states: { [key: string]: BehaviorSubject<boolean> } = {};

	constructor() {
		window.onkeyup = (key) => {
			if (this.open && (key.keyCode === 27 || key.key === 'Escape' || key.key === 'Esc')) {
				this.closeModal();
			}
		}
	}

	initModal(label: string) {
		this.states[label] = new BehaviorSubject(false);
		return this.states[label].asObservable();
	}

	openModal(label: string) {
		if (!label) {
			return;
		}
		for (let key in this.states) {
			this.states[key].next(false);
		}
		this.states[label].next(true);
		this.open = true;
	}

	closeModal() {
		for (let key in this.states) {
			this.states[key].next(false);
		}
		this.open = false;
	}

}
