interface String {
	ucFirst(): string;
}

interface Array<T> {
	sum(): number;
}

String.prototype.ucFirst = function() {
	return this.charAt(0).toUpperCase() + this.slice(1);
}

Array.prototype.sum = function () {
	return this.reduce(function (sum, value) {
		return sum + value;
	}, 0);
}