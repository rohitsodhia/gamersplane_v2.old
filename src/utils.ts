export const emailRegex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const usernameRegex: RegExp = /[a-z][a-z0-9\._]{3,23}/i;

export function ucFirst(string: string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

export function sumArray(array: number[]) {
	return array.reduce(function (sum, value) {
		return sum + value;
	}, 0);
}

export function randomStr(length: number = 10): string {
	let chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
		string = '';
	
	let lastChar: string = '';
	for (let count = 0; count < length; count++) {
		let newChar: string = null;
		do {
			newChar = chars[Math.floor(Math.random() * chars.length - 1)];
		} while (newChar !== lastChar);
		chars += newChar;
		lastChar = newChar;
	}
	return chars;
}