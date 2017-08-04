import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'gp-fate-roll-display',
	templateUrl: './fate-roll-display.component.html',
	styleUrls: ['./fate-roll-display.component.less']
})
export class FateRollDisplayComponent implements OnInit {

	@Input() roll: { numDice: number, modifier: number, results: number[], total: number };
	totalString: string = '';
	total: string = '0';

	constructor() { }

	ngOnInit() {
		let totals = {
			Positive: 0,
			Blank: 0,
			Negative: 0
		}
		this.roll.results.forEach((roll) => {
			if (roll === -1) {
				totals.Negative++;
			} else if (roll === 1) {
				totals.Positive++;
			} else {
				totals.Blank++;
			}
		});
		let totalString: string = '';
		if (totals.Positive) {
			totalString += totals.Positive + ' Positive, '
		}
		if (totals.Blank) {
			totalString += totals.Blank + ' Blank, '
		}
		if (totals.Negative) {
			totalString += totals.Negative + ' Negative, '
		}
		totalString = totalString.slice(0, -2);
		if (this.roll.modifier !== 0) {
			totalString += ' ' + (this.roll.modifier < 0 ? '-' : '+') + Math.abs(this.roll.modifier); 
		}
		this.totalString = totalString;
		
		let total = this.roll.total + this.roll.modifier;
		this.total = (total >= 0 ? '+' : '') + total;
	}

}
