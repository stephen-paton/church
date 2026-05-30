import { DataChecker } from '../helper/DataChecker.js';
import { die } from '../system/die.js';

export class ch_str {
	#value;

	constructor(value) {
		if (!DataChecker.is_string(value)) die(`Programmer Error :: ch_str.constructor :: 'value' is not a string`);

		this.#value = value;
	}

	get val() {
		return this.#value;
	}

	starts_with(other) {
		if (!DataChecker.is_ch_str(other)) die(`Programmer Error :: ch_str.starts_with :: 'value' is not a ch_str`);

		return this.val.startsWith(other.val);
	}

	delete_first_occurrence_of(value_to_delete) {
		if (!DataChecker.is_ch_str(value_to_delete)) die(`Programmer Error :: ch_str.replace :: 'value_to_delete' is not a ch_str`);

		this.#value = this.#value.replace(value_to_delete.val, '');
	}
}
