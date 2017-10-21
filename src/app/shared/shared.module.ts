import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { TrapezoidComponent } from './trapezoid/trapezoid.component';
import { ComboboxComponent } from './combobox/combobox.component';
import { PrettySelectComponent } from './pretty-select/pretty-select.component';
import { PrettySelectAttrComponent } from './pretty-select-attr/pretty-select-attr.component';
import { ClickOutsideDirective } from './click-outside.directive';
import { SkewComponent } from './skew/skew.component';
import { PrettyCheckboxComponent } from './pretty-checkbox/pretty-checkbox.component';
import { UserLinkComponent } from './user-link/user-link.component';

import { HbMarginDirective } from './hb-margin.directive';

@NgModule({
	imports: [
		CommonModule,
		FormsModule
	],
	declarations: [
		LoadingSpinnerComponent,
		TrapezoidComponent,
		ComboboxComponent,
		PrettySelectComponent,
		PrettySelectAttrComponent,
		PrettyCheckboxComponent,
		ClickOutsideDirective,
		SkewComponent,
		UserLinkComponent,
		HbMarginDirective,
	],
	exports: [
		LoadingSpinnerComponent,
		TrapezoidComponent,
		ComboboxComponent,
		PrettySelectComponent,
		PrettySelectAttrComponent,
		PrettyCheckboxComponent,
		ClickOutsideDirective,
		SkewComponent,
		UserLinkComponent,
		HbMarginDirective,
	],
	providers: [
	]
})
export class SharedModule { }
