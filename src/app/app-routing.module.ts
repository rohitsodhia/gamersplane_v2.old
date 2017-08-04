import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { LoginComponent } from './login/login.component';
// import { NotFoundComponent } from './not-found/not-found.component';

// import { LoggedInGuard } from './login/logged-in.guard';
// import { LoggedOutGuard } from './login/logged-out.guard';

const routes: Routes = [
	// {
	// 	path: 'login',
	// 	component: LoginComponent,
	// 	canActivate: [LoggedOutGuard]
	// },
	// {
	// 	path: '',
	// 	component: NotFoundComponent,
	// 	pathMatch: 'full'
	// },
	// {
	// 	path: '',
	// 	component: NotFoundComponent,
	// },
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes)
	],
	exports: [
		RouterModule
	],
	providers: [
		// LoggedInGuard,
		// LoggedOutGuard
	]
})
export class AppRoutingModule { }
