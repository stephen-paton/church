import { DataChecker } from '../helpers/DataChecker.js';

export class System {
	static die(exit_reason) {
		throw new Error(exit_reason);
	}

	static die_if_not_type(arg, arg_description, expected_type, expected_type_description, caller_description) {
		if (!(DataChecker.is_type(arg, expected_type))) System.die(`Programmer Error :: ${caller_description} :: '${arg_description}' is not a ${expected_type_description}`);
	}

	static die_if_not_array_of_type(arg, arg_description, expected_type, expected_type_description, caller_description) {
		if (!(DataChecker.is_array_of_type(arg, expected_type))) System.die(`Programmer Error :: ${caller_description} :: '${arg_description}' is not an array of ${expected_type_description}`);
	}
}
