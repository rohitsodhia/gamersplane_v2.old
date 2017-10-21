import { Component, OnInit, Input } from '@angular/core';

import { StarWarsFFGDie } from '../StarWarsFFGDie.class';

@Component({
	selector: 'gp-starwarsffg-die',
	templateUrl: './starwarsffg-die.component.html',
	styleUrls: ['./starwarsffg-die.component.less']
})
export class StarWarsFFGDieComponent implements OnInit {

	diceTypes: string[] = StarWarsFFGDie.getTypes();
	faces: {} = StarWarsFFGDie.getFaces();

	@Input() die: string = null;
	@Input() face: string[] = [];
	faceClass: string = 'single';

	constructor() { }

	ngOnInit() {
		if (this.die && this.face.length) {
			if (this.face.length === 1) {
				this.faceClass = 'single';
			} else if (this.face.length === 2) {
				this.faceClass = 'double';
			}
		}
	}

}
