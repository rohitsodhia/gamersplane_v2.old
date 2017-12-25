import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { System } from 'app/shared/system.interface';

import { ScreenWidthService } from 'app/shared/screen-width.service';
import { PortalModalService } from 'app/portal/portal-modal.service';
import { SystemService } from 'app/shared/system.service';
import { GameService } from 'app/shared/game.service';

@Component({
	selector: 'gp-landing',
	templateUrl: './landing.component.html',
	styleUrls: ['./landing.component.less']
})
export class LandingComponent implements OnInit {

	systems: {}[] = [];
	loadingGames: boolean = true;
	games: {}[] = [];
	focusOn: string = null;
	whatIsLogos: string[];
	screenWidth: Observable<number>;

	constructor(
		private screenWidthService: ScreenWidthService,
		private portalModalService: PortalModalService,
		private systemService: SystemService,
		private gameService: GameService
	) { }

	ngOnInit() {
		this.screenWidth = this.screenWidthService.get();
		this.screenWidth.subscribe(width => {
			if (width >= 1024) {
				this.whatIsLogos = ['dnd5', 'thestrange', 'pathfinder', 'starwarsffg', '13thage', 'numenera', 'shadowrun5', 'fate', 'savageworlds'];
			} else {
				this.whatIsLogos = ['dnd5', 'thestrange', 'pathfinder', 'starwarsffg', '13thage', 'numenera', 'shadowrun5', 'fate'];
			}
		});
		this.systemService.get().subscribe((systems) => {
			this.systems = [{ value: 'all', 'display': 'All' }];
			systems.forEach((system: System) => {
				this.systems.push({ value: system._id, 'display': system.name });
			})
		});
	}

	getGames(system?: string): Observable<{}> {
		return this.gameService.get({
			system: system !== undefined ? system : null,
			orderBy: 'created',
			orderByDir: 'desc',
			limit: 3,
			fields: 'title,gm,system,numPlayers,playerCount'
		});
	}

	setSystem(system) {
		if (system === 'all') {
			system = null;
		}
		this.loadingGames = true;
		this.games = [];
		this.getGames(system).subscribe(data => {
			this.games = data['games'];
			this.loadingGames = false;
		});
	}

	openPortalModal(state: 'register' | 'login') {
		this.portalModalService.openPortal(state);
	}
	
}
