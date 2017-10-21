import { Component, OnInit, Input, ViewChild, ElementRef, HostListener, Output, EventEmitter } from '@angular/core';

import { Option } from './option.interface';

@Component({
	selector: 'rs-combobox',
	templateUrl: './combobox.component.html',
	styleUrls: ['./combobox.component.less']
})
export class ComboboxComponent implements OnInit {

	options: Option[] = [];
	@Input('data') set setData(data: {} | {}[] | string[]) {
		this.options = [];

		const optsIsArray: boolean = Array.isArray(data);
		if (optsIsArray && (<{}[] | string[]> data).length === 0) {
			return;
		}

		for (let key in data) {
			let val = data[key];
			if (typeof val !== 'object') {
				val = { 'display': val };
				val.value = optsIsArray ? val.display : key;
			} else if (val.display !== undefined && val.display.length && (val.value === undefined || val.value.length === 0)) {
				val.value = val.display;
			} else if (val.display === undefined || val.display.length === 0) {
				continue;
			}

			if (val.class === undefined) {
				val.class = [];
			}
			this.options.push(val);
		}

		if (
			this.select && 
			this.options.length &&
			(
				!this.value ||
				!this.options.find((option) => this.value === option.value)
			) &&
			!this.hasFocus
		) {
			this.setBox(this.options[0]);
			this.setSelected(0);
		}

		this.filterOptions();
	}
	filteredOptions: Option[] = [];
	bypassFilter: boolean = true;
	search: string = '';
	@Input('select') select: boolean = false;
	curSelected: number = -1;
	value: string | number;
	hasFocus: boolean = false;
	showDropdown: boolean = false;
	@Output() public change = new EventEmitter();

	@ViewChild('results') results: ElementRef;

	@HostListener('document:click', ['$event.target']) public onClick(targetElement) {
		const clickedInside = this.elementRef.nativeElement.contains(targetElement);
		if (!clickedInside) {
			this.changeDropdownVis(false);
		}
	}

	constructor(
		private elementRef: ElementRef,
	) { }

	ngOnInit() {
		if (this.select !== undefined) {
			this.select = true;
		}
		if (
			this.select &&
			this.options.length &&
			(
				!this.value ||
				!this.options.find((option) => this.value === option.value)
			) &&
			!this.hasFocus
		) {
			this.setBox(this.options[0]);
			this.setSelected(0);
		}
	}

	inputFocused = function () {
		this.hasFocus = true;
		this.showDropdown = true;
	}
	inputBlurred = function () {
		this.hasFocus = false;
		this.showDropdown = false;
	}
	toggleDropdownVis() {
		this.showDropdown = !this.showDropdown;
	}
	changeDropdownVis(state: boolean) {
		this.showDropdown = state;
	}

	filterOptions() {
		if (!this.bypassFilter) {
			this.filteredOptions = this.options.filter((option) => option.display.toLowerCase().indexOf(this.search.toLowerCase()) >= 0);
		} else {
			this.filteredOptions = this.options;
		}
	}

	navigateResults($event) {
		// Key: enter
		if ($event.keyCode == 13) {
			if (this.showDropdown) {
				$event.preventDefault();
			}
			if (this.curSelected === -1 && this.filteredOptions.length == 1) {
				this.setBox(this.filteredOptions[0]);
			} else if (this.curSelected !== -1 && this.filteredOptions[this.curSelected] !== undefined) {
				this.setBox(this.filteredOptions[this.curSelected]);
			} else if (this.curSelected !== -1 && this.select) {
				this.search = this.options.find((option) => option.value === this.value).display;
			}
		// Key 38: up
		// Key 40: down
		} else if ($event.keyCode == 38 || $event.keyCode == 40) {
			$event.preventDefault();
			if (!this.showDropdown) {
				this.showDropdown = true;
			}
			// $results = $($resultsWrapper).children();
			let resultsWrapper = this.results.nativeElement,
				resultsHeight = this.results.nativeElement.offsetHeight,
				results = this.results.nativeElement.children;

			if ($event.keyCode == 40) {
				this.curSelected += 1;
				if (this.curSelected >= this.filteredOptions.length) {
					this.curSelected = 0;
				}
			} else if ($event.keyCode == 38) {
				this.curSelected -= 1;
				if (this.curSelected < 0) {
					this.curSelected = this.filteredOptions.length - 1;
				}
			}
			// console.log(window.getComputedStyle(this.results.nativeElement, null).height);
			// console.log();

			if (results[this.curSelected].offsetTop + results[this.curSelected].offsetHeight > resultsWrapper.scrollTop + resultsHeight) {
				resultsWrapper.scrollTop = results[this.curSelected].offsetTop + results[this.curSelected].offsetHeight - resultsHeight;
			} else if (results[this.curSelected].offsetTop < resultsWrapper.scrollTop) {
				resultsWrapper.scrollTop = results[this.curSelected].offsetTop;
			}
		// Key: escape
		} else if ($event.keyCode == 27) {
			this.showDropdown = false;
		} else {
			this.bypassFilter = false;
		}
	};

	setBox(option: Option) {
		this.value = option.value;
		this.change.emit(this.value);
		this.search = option.display;
		this.hasFocus = false;
		this.bypassFilter = true;
		this.showDropdown = false;
	}
	setSelected(index: number) {
		this.curSelected = index;
	}

}
