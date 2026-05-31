import { DataChecker } from './DataChecker.js';
import { System } from '../system/System.js';

export class Strings {
	static starts_with(value, other) {
		System.die_if_not_type(value, 'value', String, 'string', 'Strings.starts_with');
		System.die_if_not_type(other, 'other', String, 'string', 'Strings.starts_with');

		return value.startsWith(other);
	}

	static ends_with(value, other) {
		System.die_if_not_type(value, 'value', String, 'string', 'Strings.ends_with');
		System.die_if_not_type(other, 'other', String, 'string', 'Strings.ends_with');

		return value.endsWith(other);
	}

	static delete_first_occurrence(value, other) {
		System.die_if_not_type(value, 'value', String, 'string', 'Strings.delete_first_occurrence_of');
		System.die_if_not_type(other, 'other', String, 'string', 'Strings.delete_first_occurrence_of');

		return value.replace(other, '');
	}

	static concat(value, other) {
		System.die_if_not_type(value, 'value', String, 'string', 'Strings.concat');
		System.die_if_not_type(other, 'other', String, 'string', 'Strings.concat');

		return `${value}${other}`;
	}

	static concat_if_not_ends_with(value, other) {
		System.die_if_not_type(value, 'value', String, 'string', 'Strings.concat_if_not_ends_with');
		System.die_if_not_type(other, 'other', String, 'string', 'Strings.concat_if_not_ends_with');

		return Strings.ends_with(value, other) ? value : Strings.concat(value, other);
	}
}
