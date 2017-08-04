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
	face: number = null;
	@Input('face') set setFace(face) {
		this.face = parseInt(face) - 1;
	}
	faceClass: string = 'single';

	constructor() { }

	ngOnInit() {
		if (this.die && this.face) {
			if (this.faces[this.die][this.face].length === 1) {
				this.faceClass = 'single';
			} else if (this.faces[this.die][this.face].length === 2) {
				this.faceClass = 'double';
			}
		}
	}

}
