import { DataChecker } from './DataChecker.js';

export class Strings {
	static starts_with(value, other) {
		die_if_not_string(value, 'value', 'Strings.starts_with');
		die_if_not_string(other, 'other', 'Strings.starts_with');

		return value.startsWith(other);
	}

	static ends_with(value, other) {
		die_if_not_string(value, 'value', 'Strings.ends_with');
		die_if_not_string(other, 'other', 'Strings.ends_with');

		return value.endsWith(other);
	}

	static delete_first_occurrence_of(value, other) {
		die_if_not_string(value, 'value', 'Strings.delete_first_occurrence_of');
		die_if_not_string(other, 'other', 'Strings.delete_first_occurrence_of');

		return value.replace(other, '');
	}

	static concat(value, other) {
		die_if_not_string(value, 'value', 'Strings.concat');
		die_if_not_string(other, 'other', 'Strings.concat');

		return `${value}${other}`;
	}

	concat_if_not_ends_with(value, other) {
		die_if_not_string(value, 'value', 'Strings.concat_if_not_ends_with');
		die_if_not_string(other, 'other', 'Strings.concat_if_not_ends_with');

		return Strings.ends_with(value, other) ? value : Strings.concat(value, other);
	}
}

function die_if_not_string(value, arg, caller) {
	if (!(DataChecker.is_string(value))) die(`Programmer Error :: ${caller} :: 'value' is not a string`);
}
