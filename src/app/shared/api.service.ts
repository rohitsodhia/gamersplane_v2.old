import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers, URLSearchParams } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';

import { environment } from '../../environments/environment';

@Injectable()
export class ApiService {

    constructor(private http: Http) { }

	private addToken(headers: Headers) {
		let token = localStorage.getItem('token');
		if (token) {
			headers.append('Authorization', 'Bearer ' + token);
		}
		return headers;
	}

	private constructParams(params: URLSearchParams, data?: Object) {
		for (let key in data) {
			if (typeof data[key] !== 'object') {
				params.set(key, data[key]);
			} else {
				for (let oKey in data[key]) {
					params.set(key + '[' + oKey + ']', data[key][oKey]);
				}
			}
		}

		return params;
	}

	get(path: string, data?: Object): Observable<Response> {
		let headers = new Headers();
		headers = this.addToken(headers);
		let params = new URLSearchParams();
		params = this.constructParams(params, data);
		let options = new RequestOptions({
			headers: headers,
			search: params
		});
		return this.http
			.get(environment.apiDomain + path, options)
	}

	post(path, data): Observable<Response> {
		let headers = new Headers({
			'Content-Type': 'application/x-www-form-urlencoded'
		});
		headers = this.addToken(headers);
		let options = new RequestOptions({
			headers: headers
		});
		return this.http
			.post(environment.apiDomain + path, JSON.stringify(data), options)
	}

	delete(path: string, data?: Object): Observable<Response> {
		let headers = new Headers();
		headers = this.addToken(headers);
		let params = new URLSearchParams();
		params = this.constructParams(params, data);
		let options = new RequestOptions({
			headers: headers,
			search: params
		});
		return this.http
			.delete(environment.apiDomain + path, options)
	}

	patch(path: string, data?: Object): Observable<Response> {
		let headers = new Headers({
			'Content-Type': 'application/x-www-form-urlencoded'
		});
		headers = this.addToken(headers);
		let options = new RequestOptions({
			headers: headers
		});
		return this.http
			.patch(environment.apiDomain + path, JSON.stringify(data), options);
	}

}
