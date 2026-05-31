import { Cloner } from '../helpers/Cloner.js';

export class DataRef_Write {
	#value;

	constructor(value) {
		this.#value = value;
	}

	get val() {
		return Cloner.clone(this.#value);
	}

	set val(value) {
		this.#value = value;
	}
}
