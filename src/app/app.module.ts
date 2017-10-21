import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';


import { SharedModule } from './shared/shared.module';
import { ModalModule } from './shared/modal/modal.module';
// import { RecaptchaModule } from './shared/recaptcha/recaptcha.module';
import { PortalModule } from './portal/portal.module';
import { AppRoutingModule } from './app-routing.module';
import { LandingModule } from './landing/landing.module';
import { ToolsModule } from './tools/tools.module';

import { HbMarginService } from './shared/hb-margin.service';
import { PageLoadOverlayService } from './shared/page-load-overlay/page-load-overlay.service';
import { ApiService } from './shared/api.service';
import { GlobalResolverService } from './shared/global-resolver.service';
import { UserService } from './shared/user.service';
import { AuthService } from './shared/auth.service';
import { RootClassesService } from './shared/root-classes.service';
import { SystemService } from './shared/system.service';
import { GameService } from './shared/game.service';

import { AppComponent } from './app.component';
import { PageLoadOverlayComponent } from './shared/page-load-overlay/page-load-overlay.component';
import { HeaderComponent } from './shared/header/header.component';
import { LogoComponent } from './shared/logo/logo.component';
import { FooterComponent } from './shared/footer/footer.component';
import { LinksComponent } from './links/links.component';

@NgModule({
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		RouterModule,
		HttpClientModule,
		
		SharedModule,
		ModalModule,
		// RecaptchaModule,
		PortalModule,
		AppRoutingModule,
		LandingModule,
		ToolsModule,
	],
	declarations: [
		AppComponent,
		PageLoadOverlayComponent,
		HeaderComponent,
		LogoComponent,
		FooterComponent,
		LinksComponent,
	],
	providers: [
		// {
		// 	provide: APP_INITIALIZER,
		// 	useFactory: validateUserFactory,
		// 	deps: [AuthService],
		// 	multi: true
		// },
		{
			provide: APP_INITIALIZER,
			useFactory: initSystemsFactory,
			deps: [SystemService],
			multi: true
		},
		HbMarginService,
		PageLoadOverlayService,
		ApiService,
		GlobalResolverService,
		AuthService,
		RootClassesService,
		UserService,
		SystemService,
		GameService,
	],
	bootstrap: [AppComponent]
})
export class AppModule { }

export function validateUserFactory(authService: AuthService) {
	return () => authService.validateToken();
}

export function initSystemsFactory(systemService: SystemService) {
	return () => systemService.initLoad();
}