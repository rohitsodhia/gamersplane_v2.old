import { Injectable } from '@angular/core';

import * as utils from '../../utils';

import { BasicDie } from '../tools/BasicDie.class';
import { FateDie } from '../tools/FateDie.class';
import { StarWarsFFGDie } from '../tools/StarWarsFFGDie.class';

@Injectable()
export class DiceService {

	types: {} = {
		basic: 'Basic Dice',
		starwarsffg: 'Star Wars FFG',
		fate: 'Fate Dice',
		fengshui: 'Feng Shui'
	};
	basicDieRegex: RegExp = /^(\d+)?[dD](\d+)$/;

	constructor() { }

	getTypes(): {} {
		return this.types;
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
		} else if (type === 'fengShui') {
			let results = this.rollFengShuiDice(dice, <string> options['type']);
			return results;
		}
	}

	rollBasicDice(diceString: string, options: { [key: string]: string | boolean }): (string | number | object)[] {
		let dice = this.parseBasicDice(diceString);
		dice.forEach((value) => {
			if (typeof value === 'object') {
				for (let count = 0; count < value['num']; count++) {
					let roll: number[] = [];
					let die = new BasicDie(value['numFaces']);
					do {
						roll.push(die.roll());
					} while (options['rerollAces'] && roll.slice(-1)[0] === value['numSides']);
					if (roll.length === 1) {
						value['results'].push(roll[0]);
					} else {
						value['results'].push(roll);
					}
					value['total'] += utils.sumArray(roll);
				}
			}
		});
		return dice;
	}

	private parseBasicDice(diceString: string): (string | number | object)[] {
		let parsed: (string | number | object)[] = [];
		let dieSet: string = '';
		diceString = diceString.replace(/\s/g, '');
		for (let char of diceString) {
			if ('+-*/'.indexOf(char) === -1) {
				dieSet += char;
			} else {
				parsed.push(this.parseDieSet(dieSet));
				dieSet = '';
				parsed.push(char);
			}
		}
		if (dieSet !== '') {
			parsed.push(this.parseDieSet(dieSet));
		}
		return parsed;
	}

	private parseDieSet(dieSet: string) {
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
				actionValue: number,
				positive: number[],
				negative: number[],
				fortune: number,
				total: number
			} = {
				actionValue: actionValue,
				positive: [],
				negative: [],
				fortune: 0,
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
