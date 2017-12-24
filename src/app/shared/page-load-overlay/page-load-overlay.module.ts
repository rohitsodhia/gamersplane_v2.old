import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared.module';

import { PageLoadOverlayService } from './page-load-overlay.service';

import { PageLoadOverlayComponent } from './page-load-overlay.component';

@NgModule({
	imports: [
		CommonModule,
		SharedModule
	],
	declarations: [
		PageLoadOverlayComponent,
	],
	exports: [
		PageLoadOverlayComponent,
	],
	providers: [
		PageLoadOverlayService,
	]
})
export class PageLoadOverlayModule { }
