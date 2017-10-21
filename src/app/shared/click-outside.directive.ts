import {Directive, ElementRef, Output, EventEmitter, HostListener } from '@angular/core';

@Directive({
	selector: '[gpClickOutside]'
})
export class ClickOutsideDirective {

	constructor(private _elementRef : ElementRef) { }

	@Output('gpClickOutside') clickOutside = new EventEmitter();

	@HostListener('document:click', ['$event.target']) public onClick(targetElement: HTMLElement) {
		const clickedInside = this._elementRef.nativeElement.contains(targetElement);
		if (!clickedInside) {
			this.clickOutside.emit(targetElement);
		}
	}

}
