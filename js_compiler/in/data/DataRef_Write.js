export class DataRef_Write {
	#value;

	constructor(value) {
		this.#value = value;
	}

	get val() {
		return this.#value;
	}

	set val(value) {
		this.#value = value;
	}
}
