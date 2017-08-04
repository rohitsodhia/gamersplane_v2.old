import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'gp-pretty-checkbox',
	templateUrl: './pretty-checkbox.component.html',
	styleUrls: ['./pretty-checkbox.component.less']
})
export class PrettyCheckboxComponent implements OnInit {

	@Input() value: any = true;
	@Input() field: any;
	@Output() fieldChange: EventEmitter<boolean> = new EventEmitter();
	@Input() disabled: boolean = false;
	private currentValue: any;
	checked: boolean = false;

	constructor() { }

	ngOnInit() {
		if (typeof this.value === 'boolean' && this.field === undefined) {
			this.field = false; 
		}
		this.currentValue = this.field;
	}

	toggle() {
		this.checked = !this.checked;
		if (typeof this.value !== 'boolean') {
			this.currentValue = this.currentValue ? null : this.value;
		} else {
			this.currentValue = !this.currentValue;
		}
		this.fieldChange.emit(this.currentValue);
	}

}
