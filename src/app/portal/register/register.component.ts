import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import * as utils from '../../../utils';

import { RegisterPostAPIResponse } from './register-post-api-response.interface';

import { UserService } from '../../shared/user.service';


@Component({
	selector: 'gp-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.less']
})
export class RegisterComponent implements OnInit {

	register: FormGroup;
	focusOn: string;
	emailTaken: boolean = false;
	usernameTaken: boolean = false;
	human: boolean = false;

	@Output() success: EventEmitter<{}> = new EventEmitter();

	constructor(
		private formBuilder: FormBuilder,
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
				[Validators.required, Validators.minLength(4), Validators.maxLength(24), Validators.pattern(/[a-z][a-z0-9\._]{3,23}/i)]
			],
			password: this.formBuilder.group({
				password: [
					'',
					[Validators.required, Validators.minLength(8)]
				],
				confirmPassword: [
					'',
					[Validators.required, Validators.minLength(8)]
				]
			}, { validator: this.samePasswords })
		});

		this.register.get('email').valueChanges
			.filter(() => this.register.get('email').valid)
			.distinctUntilChanged().debounceTime(500)
			.switchMap((email) => this.userService.emailExists(email))
			.filter((data) => data.success)
			.subscribe((data) => {
				this.emailTaken = data.exists;
			});
		this.register.get('username').valueChanges
			.filter(() => this.register.get('username').valid)
			.distinctUntilChanged().debounceTime(500)
			.switchMap((email) => this.userService.usernameExists(email))
			.filter((data) => data.success)
			.subscribe((data) => {
				this.usernameTaken = data.exists;
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

	submitRegistration() {
		if (!this.human && this.register.invalid) {
			return false;
		}
		this.userService.register({
			email: this.register.get('email').value,
			username: this.register.get('username').value,
			password: this.register.get('password').get('password').value
		}).subscribe((data: RegisterPostAPIResponse) => {
			if (data.success) {
				this.success.emit(data.user);
			}
		})
	}

}
