import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { PortalModalService } from 'app/portal/portal-modal.service';
import { ScreenWidthService } from 'app/shared/screen-width.service';
import { AuthService } from 'app/shared/auth.service';
import { PMService } from 'app/pms/pm.service';

import { slideHeight } from 'app/shared/animations';

import { User } from 'app/shared/user.class';

@Component({
	selector: 'gp-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.less'],
	animations: [
		slideHeight('.5s')
	]
})
export class HeaderComponent implements OnInit {

	currentUser$: Observable<User>;
	loggedIn: boolean = false;
	pmCount$: Observable<number>;
	toggleHeight: {} = {};
	private currentlyOpen: { menu: any, target: any } = { menu: null, target: null };
	screenWidth: Observable<number>;
	mobileOpen: boolean = false;

	constructor(
		private router: Router,
		private screenWidthService: ScreenWidthService,
		private portalModalService: PortalModalService,
		private authService: AuthService,
		private pmService: PMService
	) {
		this.toggleHeight = {
			tools: 'closed',
			user: 'closed'
		}
	}

	ngOnInit() {
		this.screenWidth = this.screenWidthService.get();
		this.currentUser$ = this.authService.getUser();
		this.currentUser$.subscribe(user => this.loggedIn = !!user);
		this.pmCount$ = this.pmService.getPMCount();
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

	openPortalModal(state: 'register' | 'login') {
		this.portalModalService.openPortal(state);
	}

	openMobileMenu() {
		this.mobileOpen = true;
	}

	closeMobileMenu() {
		this.mobileOpen = false;
	}

	logout() {
		this.authService.logout();
	}

}
