import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { RecaptchaModule } from 'ng-recaptcha';

import { PortalRoutingModule } from './portal-routing.module';
import { SharedModule } from '../shared/shared.module';
// import { RecaptchaModule } from '../shared/recaptcha/recaptcha.module';

import { RegisterComponent } from './register/register.component';

import { PortalModalService } from './portal-modal.service';
import { LoginComponent } from './login/login.component';

@NgModule({
	imports: [
		CommonModule,
		PortalRoutingModule,
		ReactiveFormsModule,
		SharedModule,
		// RecaptchaModule,
		RecaptchaModule
	],
	declarations: [
		RegisterComponent,
		LoginComponent,
	],
	exports: [
		RegisterComponent,
		LoginComponent,
	],
	providers: [
		PortalModalService
	]
})
export class PortalModule { }
