import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'gp-feng-shui-roll-display',
	templateUrl: './feng-shui-roll-display.component.html',
	styleUrls: ['./feng-shui-roll-display.component.less']
})
export class FengShuiRollDisplayComponent implements OnInit {

	@Input() roll: {
		type: string,
		actionValue: number,
		positive: number[],
		negative: number[],
		fortune: number,
		total: number
	};
	dispParts: {
		positive: string,
		negative: string
	} = {
		positive: '',
		negative: ''
	};

	constructor() { }

	ngOnInit() {
		if (this.roll.type === 'standard' || this.roll.type === 'fortune') {
			this.dispParts.positive = '[ ' + this.roll.positive.join(', ') + ' ]';
			this.dispParts.negative = '[ ' + this.roll.negative.join(', ') + ' ]';
		} else {
			this.dispParts.positive = this.roll.positive.toString();
			this.dispParts.negative = this.roll.negative.toString();
		}
	}

}
