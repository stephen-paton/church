import { CLI_Option__file } from '../cli/CLI_Option__file.js';
import { DataRef_Read } from '../data/DataRef_Read.js';
import { DataRef_Write } from '../data/DataRef_Write.js';
import { DataType } from './DataType.js';
import { System } from '../system/System.js';

export class DataChecker {
	static is_type(value, expected_type) {
		switch (expected_type) {
			case DataType.string:
				return typeof value === 'string';
			case DataType.int:
				return typeof value === 'number' && Number.isInteger(value);
			case DataType.regex:
				return value instanceof RegExp;
			case DataType.CLI_Option__file:
				return value instanceof CLI_Option__file;
			case DataType.DataRef_Read:
				return value instanceof DataRef_Read;
			case DataType.DataRef_Write:
				return value instanceof DataRef_Write;
			default:
				System.die(`User Error :: Unrecognised type passed`);
		}
	}

	static is_array_of_type(value, expected_type) {
		return Array.isArray(value) && value.every(v => DataChecker.is_type(v, expected_type));
	}
}
