import { Cloner } from '../helpers/Cloner.js';

export class DataRef_Read {
	#value;

	constructor(value) {
		this.#value = value;
	}

	get val() {
		return Cloner.clone(this.#value);
	}
}
