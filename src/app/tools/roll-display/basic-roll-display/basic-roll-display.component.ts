import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'gp-basic-roll-display',
	templateUrl: './basic-roll-display.component.html',
	styleUrls: ['./basic-roll-display.component.less']
})
export class BasicRollDisplayComponent implements OnInit {

	@Input() roll: [{ [key: string]: any }];
	rollString: string = '';
	diceString: string = '';
	total: number = 0;

	constructor() { }

	ngOnInit() {
		let evalString: string = '';
		this.roll.forEach(rollPiece => {
			console.log(rollPiece);
			if (typeof rollPiece === 'object') {
				this.rollString += rollPiece['string'] + ' ';
				this.diceString += this.assembleDieString(rollPiece) + ' ';
				evalString += rollPiece['total'];
			} else if (typeof rollPiece === 'number' || '+-*/'.indexOf(rollPiece) !== -1) {
				this.rollString += rollPiece + ' ';
				this.diceString += rollPiece + ' ';
				evalString += rollPiece;
			}
		});
		try {
			this.total = eval(evalString);
		} catch (e) {
			console.log({
				error: 'Invalid string'
			})
		}
		// rollString = rollString.replace(/ [+\-*\/] 0/g, '');
		this.rollString = this.rollString.trim();
		this.diceString = this.diceString.trim();
	}

	private assembleDieString(roll): string {
		let results = JSON.parse(JSON.stringify(roll['results']));
		let dieString: string[] = [];
		results.forEach((roll) => {
			if (Array.isArray(roll)) {
				roll = '[ ' + roll.join(', ') + ' ] ';
			}
			dieString.push(roll);
		});
		return '( ' + dieString.join(', ') + ' )';
	}

}
