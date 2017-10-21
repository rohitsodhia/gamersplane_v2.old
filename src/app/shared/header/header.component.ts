import { ModalService } from './../modal/modal.service';
import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';

import { slideHeight } from '../animations';

@Component({
	selector: 'gp-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.less'],
	animations: [
		slideHeight('.5s')
	]
})
export class HeaderComponent implements OnInit {

	loggedIn: boolean = false;
	toggleHeight: {} = {};
	currentlyOpen: { menu: any, target: any } = { menu: null, target: null };

	constructor(
		private router: Router,
		private modalService: ModalService,
		private authService: AuthService,
	) {
		this.toggleHeight = {
			tools: 'closed'
		}
	}

	ngOnInit() {
		this.authService.loggedIn().subscribe((loggedIn: boolean) => this.loggedIn = loggedIn);
	}

	@HostListener('document:click', ['$event.target']) public onClick(targetElement) {
		if (targetElement !== this.currentlyOpen) {
			this.toggleHeight[this.currentlyOpen.menu] = 'closed';
			this.currentlyOpen.menu = null;
			this.currentlyOpen.target = null;
		}
	}

	toggleMenu(event: Event, route: string, submenu: string): void {
		event.stopPropagation();
		event.preventDefault();
		// this.router.navigateByUrl(route);
		this.currentlyOpen.menu = submenu;
		this.currentlyOpen.target = event.target;
		this.toggleHeight[submenu] = this.toggleHeight[submenu] === 'closed' ? 'open' : 'closed';
	}

	// toggleMenu(event: Event) {
	// 	event.preventDefault();
	// 	if (event.target['nextElementSibling'].tagName === 'UL') {
			
	// 	}
	// }

	register() {
		this.modalService.openModal('register');
	}

}
