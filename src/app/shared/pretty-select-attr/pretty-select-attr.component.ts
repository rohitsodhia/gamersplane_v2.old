import { Component, OnInit, ElementRef, Input, Output, EventEmitter, HostListener } from '@angular/core';

@Component({
	selector: 'select[rs-pretty-select]',
	templateUrl: './pretty-select-attr.component.html',
	styleUrls: ['./pretty-select-attr.component.less']
})
export class PrettySelectAttrComponent implements OnInit {

	settingUp: boolean = true;
	options: Option[] = null;
	value: Option = {
		value: null,
		label: null
	};
	showOptions: boolean = false;

	@Input('options') set rawOptions(input: {} | {}[]) {
		this.options = [];
		let valueExists: boolean = false;
		if (Array.isArray(input)) {
			input.forEach((value) => {
				let newOption: Option = null;
				if (typeof value === 'string') {
					newOption = {
						value: value,
						label: value
					};
				} else if (Array.isArray(value) && value['value'] !== undefined && value['label'] !== undefined) {
					newOption = {
						value: value['value'],
						label: value['label']
					};
				}
				if (newOption.value === this.value.value) {
					valueExists = true;
				}
				this.options.push(newOption);
			});
		} else {
			for (let value in input) {
				let newOption: Option = null;
				if (typeof input[value] === 'string' || typeof input[value] === 'number') {
					newOption = {
						value: value,
						label: input[value]
					};
				}
				if (newOption.value === this.value.value) {
					valueExists = true;
				}
				this.options.push(newOption);
			}
		}
		if (!valueExists) {
			this.value = this.options[0];
		}
	}
	@Output() valueChange: EventEmitter<string | number> = new EventEmitter();

	@HostListener('document:click', ['$event.target']) public onClick(targetElement) {
		const clickedOutside = !this.elementRef.nativeElement.contains(targetElement);
		if (clickedOutside) {
			this.showOptions = false;
		}
	}
	constructor(private elementRef : ElementRef) { }

	ngOnInit() {
		// console.log(1);
	}

	toggleOptions() {
		this.showOptions = !this.showOptions;
	}

	selectOption(value) {
		this.value = value;
		this.valueChange.emit(this.value.value);
		this.showOptions = false;
	}

}

interface Option {
	value: string | number;
	label: string | number;
}