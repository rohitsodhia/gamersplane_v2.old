import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import * as utils from '../../../utils';

import { RegisterPostAPIResponse } from './register-post-api-response.interface';

// import { RecaptchaService } from 'app/shared/recaptcha/recaptcha.service';
import { UserService } from '../../shared/user.service';
import { AbstractControl } from '@angular/forms/src/model';
import { Observable } from 'rxjs/Observable';


@Component({
	selector: 'gp-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.less']
})
export class RegisterComponent implements OnInit {

	register: FormGroup;
	focusOn: string;
	taken: { email: boolean, username: boolean } = {
		email: false,
		username: false
	};
	recaptchaString: string = null;

	@Output() success: EventEmitter<{}> = new EventEmitter();

	constructor(
		private formBuilder: FormBuilder,
		// private recaptchaService: RecaptchaService,
		private userService: UserService,
	) { }

	ngOnInit() {
		this.register = this.formBuilder.group({
			email: [
				'',
				[Validators.required, Validators.pattern(utils.emailRegex)]
			],
			username: [
				'',
				[Validators.required, Validators.minLength(4), Validators.maxLength(24), Validators.pattern(utils.usernameRegex)]
			],
			password: this.formBuilder.group({
				password: [
					'',
					// [Validators.required, Validators.minLength(8)]
				],
				confirmPassword: [
					'',
					// [Validators.required, Validators.minLength(8)]
				]
			}, { validator: this.samePasswords })
		});

		['email', 'username'].forEach((field: string) => {
			this.register.get(field).valueChanges
				.filter(() => this.register.get(field).valid)
				.distinctUntilChanged().debounceTime(500)
				.switchMap((value: string) => this.userService.userExists(field, value))
				.subscribe(exists => {
					this.taken[field] = exists;
				});
		});

	}

	samePasswords(group: FormGroup) {
		return group.get('password').value === group.get('confirmPassword').value ? null : { mismatchedPasswords: true };
	}

	setFocus(focus: string) {
		this.focusOn = focus;
	}

	loseFocus() {
		this.focusOn = null;
	}

	recaptchaResolved($event) {
		this.recaptchaString = $event;
	}

	submitRegistration() {
		if (this.recaptchaString == null && this.register.invalid) {
			return false;
		}
		this.userService.register({
			email: this.register.get('email').value,
			username: this.register.get('username').value,
			password: this.register.get('password').get('password').value,
			recaptcha: this.recaptchaString
		}).subscribe(response => {
			if (response.data) {
				this.success.emit(response.data.user);
			}
		})
	}

}
