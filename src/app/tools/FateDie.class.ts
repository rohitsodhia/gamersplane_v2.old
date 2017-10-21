import { Die } from './Die.class';

export class FateDie extends Die {

	constructor() {
		super(3);
	}



	roll() {
		this.result = Math.floor(Math.random() * this.sides) - 1;

		return this.result;
	}

}