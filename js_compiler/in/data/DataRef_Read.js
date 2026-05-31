export class DataRef_Read {
	#value;

	constructor(value) {
		this.#value = value;
	}

	get val() {
		return this.#value;
	}
}
