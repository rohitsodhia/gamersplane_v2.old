import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { RecaptchaModule } from 'ng-recaptcha';

import { SharedModule } from 'app/shared/shared.module';
import { PageLoadOverlayModule } from 'app/shared/page-load-overlay/page-load-overlay.module';
import { ModalModule } from 'app/shared/modal/modal.module';
// import { RecaptchaModule } from 'app/shared/recaptcha/recaptcha.module';
import { PortalModule } from 'app/portal/portal.module';
import { AppRoutingModule } from 'app/app-routing.module';
import { LandingModule } from 'app/landing/landing.module';
import { ToolsModule } from 'app/tools/tools.module';

import { HbMarginService } from 'app/shared/hb-margin.service';
import { ApiService } from 'app/shared/api.service';
import { ScreenWidthService } from 'app/shared/screen-width.service';
import { RootClassesService } from 'app/shared/root-classes.service';
import { GlobalResolverService } from 'app/shared/global-resolver.service';
import { ReferralLinksService } from 'app/shared/referral-links.service';
import { UserService } from 'app/shared/user.service';
import { PMService } from 'app/pms/pm.service';
import { AuthService } from 'app/shared/auth.service';
import { SystemService } from 'app/shared/system.service';
import { GameService } from 'app/shared/game.service';

import { AppComponent } from 'app/app.component';
import { HeaderComponent } from 'app/shared/header/header.component';
import { LogoComponent } from 'app/shared/logo/logo.component';
import { FooterComponent } from 'app/shared/footer/footer.component';
import { LinksComponent } from 'app/links/links.component';
import { ContactComponent } from 'app/contact/contact.component';

@NgModule({
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		RouterModule,
		HttpClientModule,

		RecaptchaModule.forRoot(),
		
		SharedModule,
		PageLoadOverlayModule,
		ModalModule,
		// RecaptchaModule,
		PortalModule,
		AppRoutingModule,
		LandingModule,
		ToolsModule,
	],
	declarations: [
		AppComponent,
		HeaderComponent,
		LogoComponent,
		FooterComponent,
		LinksComponent,
		ContactComponent,
	],
	providers: [
		{
			provide: APP_INITIALIZER,
			useFactory: validateUserFactory,
			deps: [AuthService],
			multi: true
		},
		{
			provide: APP_INITIALIZER,
			useFactory: initPMTimer,
			deps: [PMService],
			multi: true
		},
		{
			provide: APP_INITIALIZER,
			useFactory: initSystemsFactory,
			deps: [SystemService],
			multi: true
		},
		HbMarginService,
		ApiService,
		ScreenWidthService,
		RootClassesService,
		GlobalResolverService,
		ReferralLinksService,
		AuthService,
		UserService,
		PMService,
		SystemService,
		GameService,
	],
	bootstrap: [AppComponent]
})
export class AppModule { }

export function validateUserFactory(authService: AuthService) {
	return () => authService.validateToken();
}

export function initPMTimer(pmService: PMService) {
	return () => pmService.getInitialPMCount();
}

export function initSystemsFactory(systemService: SystemService) {
	return () => systemService.initLoad();
}