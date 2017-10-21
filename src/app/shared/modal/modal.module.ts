import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared.module';

import { ModalComponent } from './modal.component';

import { ModalService } from './modal.service';

@NgModule({
	imports: [
		CommonModule,
		SharedModule
	],
	declarations: [
		ModalComponent,
	],
	exports: [
		ModalComponent,
	],
	providers: [
		ModalService,
	]

})
export class ModalModule { }
