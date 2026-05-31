import { Cloner } from '../helpers/Cloner.js';
import { DataChecker } from '../helpers/DataChecker.js';
import { Strings } from '../helpers/Strings.js';
import { System } from '../system/System.js';

const PREFIX = 'file=';

export class CLI_Option__file {
	#path;

	constructor(path) {
		System.die_if_not_type(path, 'path', String, 'string', 'CLI_Option__file.constructor');

		this.#path = path;
	}

	get path() {
		return Cloner.clone(this.#path);
	}

	static try_from_args(args) {
		System.die_if_not_array_of_type(args, 'args', String, 'string', 'CLI_Option__file.try_from_args');

		for (let arg of args) {
			if (!Strings.starts_with(arg, PREFIX)) continue;
				
			arg = Strings.delete_first_occurrence(arg, PREFIX);
			return new CLI_Option__file(arg);
		}

		return false;
	}
}
