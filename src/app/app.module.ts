import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { ToolsModule } from './tools/tools.module';

import { PageLoadOverlayService } from './shared/page-load-overlay/page-load-overlay.service';
import { ApiService } from './shared/api.service';
import { AuthService } from './shared/auth.service';

import { AppComponent } from './app.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { PageLoadOverlayComponent } from './shared/page-load-overlay/page-load-overlay.component';
import { HeaderComponent } from './shared/header/header.component';
import { LogoComponent } from './shared/logo/logo.component';
import { FooterComponent } from './shared/footer/footer.component';
import { ComboboxComponent } from './shared/combobox/combobox.component';
import { LinksComponent } from './links/links.component';

@NgModule({
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		RouterModule,
		HttpModule,

		AppRoutingModule,
		ToolsModule,
	],
	declarations: [
		AppComponent,
		LoadingSpinnerComponent,
		PageLoadOverlayComponent,
		HeaderComponent,
		LogoComponent,
		FooterComponent,
		ComboboxComponent,
		LinksComponent,
	],
	providers: [
		PageLoadOverlayService,
		ApiService,
		AuthService,
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
