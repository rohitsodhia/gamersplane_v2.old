import { Component, OnInit, Input } from '@angular/core';

import * as utils from '../../../../utils';

import { StarWarsFFGDie } from '../../StarWarsFFGDie.class';

@Component({
	selector: 'gp-starwarsffg-roll-display',
	templateUrl: './starwarsffg-roll-display.component.html',
	styleUrls: ['./starwarsffg-roll-display.component.less']
})
export class StarWarsFFGRollDisplayComponent implements OnInit {

	faces: { [key: string]: string[][] } = StarWarsFFGDie.getFaces();

	@Input() roll: [{ [key: string]: any }];
	sumString: string = '';
	totalString: string = '';

	constructor() { }

	ngOnInit() {
		let sums: { [key: string]: number }	= {
			success: 0,
			advantage: 0,
			triumph: 0,
			failure: 0,
			threat: 0,
			despair: 0,
			dot_white: 0,
			dot_black: 0
		}
		this.roll.forEach(die => {
			console.log(die);
			die.roll.forEach((symbol) => {
				if (symbol) {
					sums[symbol]++;
				}
			});
		});
		let nonZeros: string[] = [];
		for (let symbol in sums) {
			if (sums[symbol] !== 0) {
				if (symbol.substr(0, 4) !== 'dot_') {
					nonZeros.push(sums[symbol] + ' ' + utils.ucFirst(symbol));
				} else {
					nonZeros.push(sums[symbol] + ' ' + utils.ucFirst(symbol.substr(4)) + ' Dot' + (sums[symbol] > 1 ? 's' : ''));
				}
			}
		}
		this.sumString = nonZeros.join(', ');
		let totalString: string = '';
		if (sums.success + sums.triumph !== sums.failure + sums.despair) {
			totalString += Math.abs(sums.success + sums.triumph - sums.failure + sums.despair) + ' ' + (sums.success + sums.triumph > sums.failure + sums.despair ? 'Success' : 'Failure') + ', ';
		}
		if (sums.advantage !== sums.threat) {
			totalString += Math.abs(sums.advantage - sums.threat) + ' ' + (sums.advantage > sums.threat ? 'Advantage' : 'Threat') + ', ';
		}
		if (sums.triumph) {
			totalString += sums.triumph + ' Triumph, ';
		}
		if (sums.despair) {
			totalString += sums.despair + ' Despair, ';
		}
		if (totalString.length > 0) {
			this.totalString = totalString.slice(0, -2);
		} else {
			this.totalString = 'Nothing';
		}
	}

}
