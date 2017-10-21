import { Die } from './Die.class';

export class StarWarsFFGDie extends Die {

	private static types: string[] = ['ability', 'proficiency', 'boost', 'difficulty', 'challenge', 'setback', 'force'];
	private static faces: {} = {
		'ability': [[''], ['success'], ['success'], ['advantage'], ['advantage'], ['success', 'success'], ['success', 'advantage'], ['advantage', 'advantage']],
		'proficiency': [[''], ['success'], ['success'], ['advantage'], ['success', 'success'], ['success', 'success'], ['success', 'advantage'], ['success', 'advantage'], ['success', 'advantage'], ['advantage', 'advantage'], ['advantage', 'advantage'], ['triumph']],
		'boost': [[''], [''], ['success'], ['advantage'], ['success', 'advantage'], ['advantage', 'advantage']],
		'difficulty': [[''], ['failure'], ['threat'], ['threat'], ['threat'], ['failure', 'failure'], ['failure', 'threat'], ['threat', 'threat']],
		'challenge': [[''], ['failure'], ['failure'], ['threat'], ['threat'], ['failure', 'failure'], ['failure', 'failure'], ['failure', 'threat'], ['failure', 'threat'], ['threat', 'threat'], ['threat', 'threat'], ['despair']],
		'setback': [[''], [''], ['failure'], ['failure'], ['threat'], ['threat']],
		'force': [['dot_white'], ['dot_white'], ['dot_white', 'dot_white'], ['dot_white', 'dot_white'], ['dot_white', 'dot_white'], ['dot_black'], ['dot_black'], ['dot_black'], ['dot_black'], ['dot_black'], ['dot_black'], ['dot_black', 'dot_black']],
	}
	private type: string;

	static getTypes(): string[] {
		return this.types;
	}

	static getFaces(): {} {
		return this.faces;
	}

	static getDieFaces(die: string): string[][] {
		if (Object.keys(this.faces).indexOf(die) >= 0) {
			return this.faces[die];
		} else {
			return null;
		}
	}

	constructor(type: string) {
		if (StarWarsFFGDie.getTypes().indexOf(type) === -1) {
			throw "Invalid type";
		}
		super(StarWarsFFGDie.getDieFaces(type).length);
		this.type = type;
	}

	roll() {
		this.result = StarWarsFFGDie.getDieFaces(this.type)[Math.floor(Math.random() * this.sides)];

		return this.result;
	}

}