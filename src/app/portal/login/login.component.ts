import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import * as utils from '../../../utils';

import { UserService } from '../../shared/user.service';

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
		private userService: UserService,
	) { }

	ngOnInit() {
		this.login = this.formBuilder.group({
			user: [
				'',
				[Validators.required]
			],
			password: [
				'',
				[Validators.required, Validators.minLength(8)]
			],
		});
	}

	submitLogin() {
		if (this.login.invalid) {
			return false;
		}
		this.userService.login(
			this.login.get('login').value,
			this.login.get('password').value
		).subscribe((data) => {
			if (data.success) {
				// this.success.emit(data.user);
			}
		})
	}

	openRegister() {
	}

	accountRecovery() {
	}

}
