import { Component, OnInit, ContentChild, TemplateRef, Input, HostListener, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ModalService } from './modal.service';

@Component({
  selector: 'gp-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.less']
})
export class ModalComponent implements OnInit {

	@ContentChild(TemplateRef) contentTemplate;
	@Input() name: string;
	state$: Observable<boolean> = Observable.of(false);

	constructor(private modalService: ModalService) { }

	ngOnInit() {
		this.state$ = this.modalService.initModal(this.name);
	}

	clickedOverlay(event: MouseEvent) {
		if ((<HTMLElement>event.target).parentElement.tagName === 'GP-MODAL') {
			this.closeModal();
		}
	}

	closeModal() {
		this.modalService.closeModal();
	}

}
