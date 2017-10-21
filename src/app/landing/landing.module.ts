import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingRoutingModule } from './landing-routing.module';
import { LandingComponent } from './landing/landing.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
	imports: [
		CommonModule,
		LandingRoutingModule,
		SharedModule,
	],
	declarations: [
		LandingComponent,
	],
	providers: [
	]
})
export class LandingModule { }
