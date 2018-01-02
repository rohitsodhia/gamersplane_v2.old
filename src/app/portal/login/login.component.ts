import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import * as utils from '../../../utils';

import { AuthService } from '../../shared/auth.service';

@Component({
	selector: 'gp-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

	login: FormGroup;

	@Output() success: EventEmitter<{}> = new EventEmitter();

	constructor(
		private formBuilder: FormBuilder,
		private authService: AuthService,
	) { }

	ngOnInit() {
		this.login = this.formBuilder.group({
			login: [
				'',
				[Validators.required]
			],
			password: [
				'',
				[Validators.required, Validators.minLength(7)]
			],
		});
	}

	submitLogin() {
		if (this.login.invalid) {
			return false;
		}
		this.authService.login(
			this.login.get('login').value,
			this.login.get('password').value
		).subscribe(success => {
			this.success.emit(success);
		});
	}

	openRegister() {
	}

	accountRecovery() {
	}

}
