import { Injectable } from '@angular/core';

import { StarWarsFFGDie } from '../tools/StarWarsFFGDie.class';

@Injectable()
export class DiceService {

	types: {} = {
		basic: 'Basic Dice',
		starwarsffg: 'Star Wars FFG',
		fate: 'Fate Dice',
		fengshui: 'Feng Shui'
	};
	basicDieRegex: RegExp = /^(\d+)?d(\d+)$/;

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
		}
	}

	rollBasicDice(diceString: string, options: { [key: string]: string | boolean }): (string | number | object)[] {
		let dice = this.parseBasicDice(diceString);
		dice.forEach((value) => {
			if (typeof value === 'object') {
				for (let count = 0; count < value['num']; count++) {
					let roll: number[] = [];
					do {
						roll.push(this.rollDie(value['die']));
					} while (options['rerollAces'] && roll.slice(-1)[0] === value['die']);
					if (roll.length === 1) {
						value['results'].push(roll[0]);
					} else {
						value['results'].push(roll);
					}
					value['total'] += roll.sum();
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
				die: parseInt(match[2]),
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
		dice.forEach((die) => {
			let numFaces: number = StarWarsFFGDie.getDieFaces(die).length;
			rolls.push({
				type: die,
				roll: this.rollDie(numFaces)
			})
		})
		return rolls;
	}

	private rollFateDice(numDice: number, modifier: number = 0) {
		let results: number[] = [];
		for (let die = 0; die < numDice; die++) {
			results.push(this.rollDie(3) - 2);
		}
		return {
			numDice: numDice,
			modifier: modifier,
			results: results,
			total: results.sum() + modifier
		};
	}

}
