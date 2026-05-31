import { DataType } from './DataType.js';
import { System } from '../system/System.js';

export class Strings {
	static starts_with(value, other) {
		System.die_if_not_type(value, 'value', DataType.string, 'string', 'Strings.starts_with');
		System.die_if_not_type(other, 'other', DataType.string, 'string', 'Strings.starts_with');

		return value.startsWith(other);
	}

	static ends_with(value, other) {
		System.die_if_not_type(value, 'value', DataType.string, 'string', 'Strings.ends_with');
		System.die_if_not_type(other, 'other', DataType.string, 'string', 'Strings.ends_with');

		return value.endsWith(other);
	}

	static delete_first_occurrence(value, other) {
		System.die_if_not_type(value, 'value', DataType.string, 'string', 'Strings.delete_first_occurrence_of');
		System.die_if_not_type(other, 'other', DataType.string, 'string', 'Strings.delete_first_occurrence_of');

		return value.replace(other, '');
	}

	static concat(value, other) {
		System.die_if_not_type(value, 'value', DataType.string, 'string', 'Strings.concat');
		System.die_if_not_type(other, 'other', DataType.string, 'string', 'Strings.concat');

		return `${value}${other}`;
	}

	static concat_if_not_ends_with(value, other) {
		System.die_if_not_type(value, 'value', DataType.string, 'string', 'Strings.concat_if_not_ends_with');
		System.die_if_not_type(other, 'other', DataType.string, 'string', 'Strings.concat_if_not_ends_with');

		return Strings.ends_with(value, other) ? value : Strings.concat(value, other);
	}

	static newline_count(value) {
		System.die_if_not_type(value, 'value', DataType.string, 'string', 'Strings.newline_count');

		let count = 0;
		
		for (let i = 0; i < value.length; i++) if (value.charCodeAt(i) === 10) count++;

		return count;
	}
}
