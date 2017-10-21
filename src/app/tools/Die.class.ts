export abstract class Die {

	protected sides: number;
	protected result: number | string | (number | string)[] = 0;

	constructor(sides: number) {
		this.sides = sides;
	}

	toString() {
		return this.result;
	}

	abstract roll(): number | string | (number | string)[];

}