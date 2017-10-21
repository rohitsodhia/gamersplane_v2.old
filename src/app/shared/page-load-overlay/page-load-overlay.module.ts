import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageLoadOverlayService } from './page-load-overlay.service';

import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import { PageLoadOverlayComponent } from './page-load-overlay.component';

@NgModule({
	imports: [
		CommonModule
	],
	declarations: [
		LoadingSpinnerComponent,
		PageLoadOverlayComponent,
	],
	exports: [
		LoadingSpinnerComponent,
		PageLoadOverlayComponent,
	],
	providers: [
		PageLoadOverlayService,
	]
})
export class PageLoadOverlayModule { }
