import { Component, OnInit, Input, ElementRef } from '@angular/core';

@Component({
	selector: 'gp-trapezoid',
	templateUrl: './trapezoid.component.html',
	styleUrls: ['./trapezoid.component.less']
})
export class TrapezoidComponent implements OnInit {

	@Input() skew: number = -30;
	@Input() direction: string = 'down';
	borderWidth: number;
	borderHeight: number;

	constructor(private element: ElementRef) { }

	ngOnInit() {
		if (this.direction !== 'up' && this.direction !== 'down') {
			this.direction = 'down';
		}

		this.borderHeight = this.element.nativeElement['lastElementChild']['offsetHeight'];
		this.borderWidth = Math.ceil(Math.tan(Math.abs(this.skew) * Math.PI / 180) * this.borderHeight);
	}

}
