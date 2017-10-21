import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'gp-fate-die',
	templateUrl: './fate-die.component.html',
	styleUrls: ['./fate-die.component.less']
})
export class FateDieComponent implements OnInit {

	face: string = 'blank';
	private faceMap = {
		'-1': 'negative',
		'0': 'blank',
		'1': 'positive'
	}
	@Input('face') set setFace(face: string | number) {
		if (['blank', 'positive', 'negative'].indexOf(<string> face) >= 0) {
			this.face = <string> face;
		} else if (face >= -1 && face <= 1) {
			this.face = this.faceMap[face];
		}
	}

	constructor() { }

	ngOnInit() {
	}

}
