import { Component, Input, OnChanges, SimpleChange } from '@angular/core';

@Component({
	selector: 'gp-logo',
	templateUrl: './logo.component.html',
	styleUrls: ['./logo.component.less']
})
export class LogoComponent implements OnChanges {

	@Input() width: number = 340;
	@Input() height: number = 180;
	whRatio: number = 340 / 180;

	constructor() { }

	ngOnChanges(changes: {[key: string]: SimpleChange}) {
		if ('width' in changes && !('height' in changes)) {
			this.height = changes['width'].currentValue / this.whRatio;
		} else if ('height' in changes && !('width' in changes)) {
			this.width = changes['height'].currentValue * this.whRatio;
		}
	}

}
