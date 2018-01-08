import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { PortalModalService } from './portal/portal-modal.service';
import { RootClassesService } from './shared/root-classes.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {

	contentClasses: string[];
	portalState: string;
	registeredUser: {
		userID: number,
		username: string,
		email: string
	};

	constructor(
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private rootClassesService: RootClassesService,
		private portalModalService: PortalModalService
	) {
		this.portalModalService.getState().subscribe(state => this.portalState = state);
	}

	ngOnInit() {
		this.router.events
			.filter(event => event instanceof NavigationEnd)
			.map(() => this.activatedRoute)
			.map((route) => {
				while (route.firstChild) {
					route = route.firstChild;
				}
				return route;
			})
			.flatMap(route => route.data)
			.subscribe(data => {
				this.contentClasses = data['contentClasses'] ? data['contentClasses'] : [];
				if (data['headerSize'] === 'large') {
					this.contentClasses.push('largeHeader');
				}
			});
	}

	userRegistered(user) {
		this.portalState = 'registerSuccess';
		this.registeredUser = user;
	}

	userLoggedIn(success: boolean) {
		if (success) {
			this.portalModalService.closePortal();
		}
	}

}
