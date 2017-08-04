import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrapezoidComponent } from './trapezoid/trapezoid.component';
import { PrettySelectComponent } from './pretty-select/pretty-select.component';
import { ClickOutsideDirective } from './click-outside.directive';
import { SkewComponent } from './skew/skew.component';
import { PrettyCheckboxComponent } from './pretty-checkbox/pretty-checkbox.component';

@NgModule({
	imports: [
		CommonModule
	],
	declarations: [
		TrapezoidComponent,
		PrettySelectComponent,
		PrettyCheckboxComponent,
		ClickOutsideDirective,
		SkewComponent,
	],
	exports: [
		TrapezoidComponent,
		PrettySelectComponent,
		PrettyCheckboxComponent,
		ClickOutsideDirective,
		SkewComponent,
	]
})
export class DisplayModule { }
