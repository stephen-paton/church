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

	starts_with(value) {
		if (!(DataChecker.is_string(value) || DataChecker.is_ch_str(value))) die(`Programmer Error :: ch_str.starts_with :: 'value' is not a string or ch_str`);

		if (DataChecker.is_ch_str(value)) value = value.val;

		return this.val.startsWith(value);
	}

	ends_with(value) {
		if (!(DataChecker.is_string(value) || DataChecker.is_ch_str(value))) die(`Programmer Error :: ch_str.ends_with :: 'value' is not a string or ch_str`);

		if (DataChecker.is_ch_str(value)) value = value.val;

		return this.val.endsWith(value);
	}

	delete_first_occurrence_of(value) {
		if (!(DataChecker.is_string(value) || DataChecker.is_ch_str(value))) die(`Programmer Error :: ch_str.delete_first_occurrence_of :: 'value' is not a string or ch_str`);

		if (DataChecker.is_ch_str(value)) value = value.val;

		this.#value = this.#value.replace(value, '');
	}

	concat(value) {
		if (!(DataChecker.is_string(value) || DataChecker.is_ch_str(value))) die(`Programmer Error :: ch_str.concat :: 'value' is not a string or ch_str`);

		if (DataChecker.is_ch_str(value)) value = value.val;

		this.#value += value;
	}

	concat_if_not_ends_with(value) {
		if (this.ends_with(value)) return;

		this.concat(value);
	}
}
