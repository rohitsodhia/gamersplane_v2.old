import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { System } from '../../shared/system.interface';

import { SystemService } from '../../shared/system.service';
import { GameService } from '../../shared/game.service';

@Component({
	selector: 'app-landing',
	templateUrl: './landing.component.html',
	styleUrls: ['./landing.component.less']
})
export class LandingComponent implements OnInit {

	systems: {}[] = [];
	loadingGames: boolean = true;
	games: {}[] = [];
	focusOn: string = null;
	readonly whatIsLogos: string[] = ['dnd5', 'thestrange', 'pathfinder', 'starwarsffg', '13thage', 'numenera', 'shadowrun5', 'fate', 'savageworlds'];

	constructor(
		private systemService: SystemService,
		private gameService: GameService
	) { }

	ngOnInit() {
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

}
