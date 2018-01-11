import { Component, OnInit, trigger, state, style, transition, animate } from '@angular/core';

import * as utils from 'utils';

import { StarWarsFFGDie } from 'app/tools/StarWarsFFGDie.class';

import { DiceService } from 'app/shared/dice.service';


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

	utils;
	diceTypes: {};
	currentType: string = null;
	rolls: any[] = [];
	starWarsFFGTypes: string[] = StarWarsFFGDie.getTypes();
	starWarsFFGDisplay: string[][] = [];
	starWarsFFGDicePool: string[] = [];
	fengShuiTypes: {[key: string]: string} = {};
	fengShuiType: string;

	constructor(
		private diceService: DiceService
	) {
		this.utils = utils;
	}

	ngOnInit() {
		this.diceTypes = this.diceService.getTypes();
		this.currentType = Object.keys(this.diceTypes)[0];

		this.starWarsFFGDisplay.push(this.starWarsFFGTypes.slice(0, 3));
		this.starWarsFFGDisplay.push(this.starWarsFFGTypes.slice(3, 6));

		this.diceService.getFengShuiTypes().forEach(type => {
			this.fengShuiTypes[type] = utils.ucFirst(type);
		});
		this.fengShuiType = this.diceService.getFengShuiTypes()[0];
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

	rollFengShuiDice(actionValue, type) {
		this.rolls.unshift({
			type: 'fengshui',
			roll: this.diceService.rollDice('fengshui', actionValue, { type: type })
		});
	}

}
