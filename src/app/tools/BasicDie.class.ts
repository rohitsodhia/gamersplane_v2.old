import { Die } from './Die.class';

export class BasicDie extends Die {

	constructor(sides: number) {
		if (sides < 2) {
			throw 'Less than 2 sides';
		} else if (sides > 1000) {
			throw 'More than 1000 sides';
		}
		super(sides);
	}

	roll() {
		Math.floor(Math.random() * this.sides) + 1;
	}

}