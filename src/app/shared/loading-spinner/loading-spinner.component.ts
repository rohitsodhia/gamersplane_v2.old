import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'gp-loading-spinner',
	templateUrl: './loading-spinner.component.html',
	styleUrls: ['./loading-spinner.component.less']
})
export class LoadingSpinnerComponent implements OnInit {

	showFore = false;

	constructor() { }

	ngOnInit() {
		let toggleFore = () => {
			this.showFore = !this.showFore;
			setTimeout(toggleFore, 2000);
		};
		toggleFore();
	}

}
