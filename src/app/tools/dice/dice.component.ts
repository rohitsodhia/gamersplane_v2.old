import { Component, OnInit, trigger, state, style, transition, animate } from '@angular/core';

import * as utils from '../../../utils';

import { StarWarsFFGDie } from '../StarWarsFFGDie.class';

import { DiceService } from '../../shared/dice.service';


@Component({
	selector: 'gp-dice',
	templateUrl: './dice.component.html',
	styleUrls: ['./dice.component.less'],
	animations: [
		trigger(
			'slideIn',
			[
				state('void', style({
					display: 'none',
					height: '0'
				})),
				state('open', style({
					display: 'block',
					height: '*'
				})),
				transition('void => open', [
					animate('1s ease')
				])
			]
		)
	]
})
export class DiceComponent implements OnInit {

	diceTypes: {};
	currentType: string = null;
	rolls: any[] = [];
	starWarsFFGTypes: string[] = StarWarsFFGDie.getTypes();
	starWarsFFGDisplay: string[][] = [];
	starWarsFFGDicePool: string[] = [];

	constructor(private diceService: DiceService) { }

	ngOnInit() {
		this.diceTypes = this.diceService.getTypes();
		this.currentType = Object.keys(this.diceTypes)[3];

		this.starWarsFFGTypes.forEach((die, index) => {
			if (this.starWarsFFGDisplay[index % 3] === undefined) {
				this.starWarsFFGDisplay[index % 3] = [];
			}
			if (die !== 'force') {
				this.starWarsFFGDisplay[index % 3].push(die);
			}
		});
	}

	changeDiceType(type) {
		this.currentType = type;
	}

	rollBasicDice(dice, rerollAces) {
		this.rolls.unshift({
			type: 'basic',
			roll: this.diceService.rollDice('basic', dice, { rerollAces: rerollAces })
		});
	}

	rollBasicDie(num) {
		this.rolls.unshift({
			type: 'basic',
			roll: this.diceService.rollDice('basic', 'd' + num)
		});
	}

	addStarWarsFFGDie(die) {
		if (this.starWarsFFGTypes.indexOf(die) >= 0) {
			this.starWarsFFGDicePool.push(die);
		}
	}

	removeStarWarsFFGDie(index) {
		this.starWarsFFGDicePool.splice(index, 1);
	}

	clearStarWarsFFGDice() {
		this.starWarsFFGDicePool = [];
	}

	rollStarWarsFFGDice() {
		this.rolls.unshift({
			type: 'starwarsffg',
			roll: this.diceService.rollDice('starwarsffg', this.starWarsFFGDicePool)
		});
	}

	rollFateDice(numDice, modifier) {
		let rollString: string = numDice + '+' + modifier;
		this.rolls.unshift({
			type: 'fate',
			roll: this.diceService.rollDice('fate', rollString)
		});
	}

	rollFengShui(actionValue, type) {
		this.rolls.unshift({
			type: 'fengShui',
			roll: this.diceService.rollDice('fengShui', actionValue, { type: type })
		});
	}

}
