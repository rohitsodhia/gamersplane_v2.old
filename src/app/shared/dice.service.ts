import { Injectable } from '@angular/core';

import * as utils from 'utils';

import { BasicDie } from 'app/tools/BasicDie.class';
import { FateDie } from 'app/tools/FateDie.class';
import { StarWarsFFGDie } from 'app/tools/StarWarsFFGDie.class';

@Injectable()
export class DiceService {

	private readonly types = {
		basic: 'Basic Dice',
		starwarsffg: 'Star Wars FFG',
		fate: 'Fate Dice',
		fengshui: 'Feng Shui'
	};
	private readonly basicDieRegex = /^(\d+)?[dD](\d+)$/;
	private readonly fengShuiTypes = ['standard', 'fortune', 'closed']

	constructor() { }

	getTypes() {
		return this.types;
	}

	getFengShuiTypes() {
		return this.fengShuiTypes;
	}

	rollDice(type: string, dice: any, options: { [key: string]: string | boolean } = {}): any[] | { [key: string]: any } {
		if (type === 'basic') {
			let results = this.rollBasicDice(dice, options);
			return results;
		} else if (type === 'starwarsffg') {
			let results = this.rollStarWarsFFGDice(dice);
			return results;
		} else if (type === 'fate') {
			let numDice: number,
				modifier: number;
			[numDice, modifier] = (<string> dice).split('+').map((value) => parseInt(value));
			let results = this.rollFateDice(numDice, modifier);
			return results;
		} else if (type === 'fengshui') {
			let results = this.rollFengShuiDice(parseInt(dice), <string> options['type']);
			return results;
		}
	}

	rollBasicDice(diceString: string, options: { [key: string]: string | boolean }): (string | number | BasicDieConfig)[] {
		let dice = this.parseBasicDice(diceString);
		dice.forEach(part => {
			if (typeof part === 'object') {
				for (let count = 0; count < part['num']; count++) {
					let roll: number[] = [];
					let die = new BasicDie(part['numSides']);
					do {
						roll.push(die.roll());
					} while (options['rerollAces'] && roll.slice(-1)[0] === part['numSides']);
					if (roll.length === 1) {
						part['results'].push(roll[0]);
					} else {
						part['results'].push(roll);
					}
					part['total'] += utils.sumArray(roll);
				}
			}
		});
		return dice;
	}

	private parseBasicDice(diceString: string): (string | number | BasicDieConfig)[] {
		let parsed: (string | number | BasicDieConfig)[] = [];
		let dieSet: string = '';
		diceString = diceString.replace(/\s/g, '');
		for (let char of diceString) {
			if ('+-*/'.indexOf(char) === -1) {
				dieSet += char;
			} else {
				parsed.push(this.parseDieSet(dieSet));
				parsed.push(char);
				dieSet = '';
			}
		}
		if (dieSet !== '') {
			parsed.push(this.parseDieSet(dieSet));
		}
		return parsed;
	}

	private parseDieSet(dieSet: string): (BasicDieConfig | number) {
		let match;
		if (match = dieSet.match(this.basicDieRegex)) {
			return {
				string: match['input'],
				num: match[1] ? parseInt(match[1]) : 1,
				numSides: parseInt(match[2]),
				results: [],
				total: 0
			};
		} else if (dieSet.match(/^\d+$/)) {
			return parseInt(dieSet);
		// } else {
		// 	return 0;
		}
	}

	private rollDie(numFaces) {
		return Math.floor(Math.random() * numFaces) + 1;
	}

	private rollStarWarsFFGDice(dice: string[]): { type: string, roll: number }[] {
		let rolls = [];
		dice.forEach((dieType) => {
			let die = new StarWarsFFGDie(dieType);
			rolls.push({
				type: dieType,
				roll: die.roll()
			})
		})
		return rolls;
	}

	private rollFateDice(numDice: number, modifier: number = 0) {
		let results: number[] = [];
		let die = new FateDie();
		for (let dieCount = 0; dieCount < numDice; dieCount++) {
			results.push(die.roll());
		}
		return {
			numDice: numDice,
			modifier: modifier,
			results: results,
			total: utils.sumArray(results) + modifier
		};
	}

	private rollFengShuiDice(actionValue: number, type: string = 'standard') {
		let die: BasicDie = new BasicDie(6),
			result: {
				type: string,
				actionValue: number,
				positive: number[],
				negative: number[],
				fortune: number,
				total: number
			} = {
				type: type,
				actionValue: actionValue,
				positive: [],
				negative: [],
				fortune: null,
				total: actionValue
			};
		if (type === 'standard' || type === 'fortune') {
			let roll: number = 0;
			do {
				roll = die.roll();
				result.positive.push(roll);
			} while (roll === 6);
			do {
				roll = die.roll();
				result.negative.push(roll);
			} while (roll === 6);
			result.total += utils.sumArray(result.positive) - utils.sumArray(result.negative);
			if (type === 'fortune') {
				result.fortune = die.roll();
				result.total += result.fortune;
			}
		} else {
			result.positive.push(die.roll());
			result.negative.push(die.roll());
			result.total += result.positive[0] - result.negative[0];
		}

		return result;
	}

}

interface BasicDieConfig {
	string: string,
	num: number,
	numSides: number,
	results: (number | number[])[],
	total: number
}