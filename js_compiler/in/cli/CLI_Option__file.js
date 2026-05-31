import { ch_str } from '../primitive/ch_str.js';
import { DataChecker } from '../helper/DataChecker.js';
import { die } from '../system/die.js';

export class CLI_Option__file {
	static #prefix = 'file=';

	#path;

	constructor(path) {
		if (!(DataChecker.is_string(path) || DataChecker.is_ch_str(path))) die(`Programmer Error :: CLI_Option__file.constructor :: 'path' is not a string or ch_str`);

		this.#path = DataChecker.is_string(path) ? new ch_str(path) : path;
	}

	get path() {
		return this.#path;
	}

	static try_from_args(args) {
		for (const arg of args) {
			const ch_str_arg = new ch_str(arg);

			if (!ch_str_arg.starts_with(CLI_Option__file.#prefix)) continue;
				
			ch_str_arg.delete_first_occurrence_of(CLI_Option__file.#prefix);
			return new CLI_Option__file(ch_str_arg);
		}

		return false;
	}
}
