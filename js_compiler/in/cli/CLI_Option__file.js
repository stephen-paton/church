import { ch_str } from '../primitive/ch_str.js';
import { DataChecker } from '../helper/DataChecker.js';
import { die } from '../system/die.js';

export class CLI_Option__file {
	static #prefix = new ch_str('file=');

	#path;

	constructor(path) {
		if (!DataChecker.is_ch_str(path)) die(`Programmer Error :: CLI_Option__file.constructor :: 'path' is not a ch_str`);

		this.#path = path;
	}

	get path() {
		return this.#path;
	}

	static try_from_args(args) {
		for (const arg of args) {
			if (!arg.starts_with(CLI_Option__file.#prefix)) continue;
				
			arg.delete_first_occurrence_of(CLI_Option__file.#prefix);
			return new CLI_Option__file(arg);
		}

		return false;
	}
}
