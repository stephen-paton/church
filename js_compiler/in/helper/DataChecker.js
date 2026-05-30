import { CLI_Option__file } from '../cli/CLI_Option__file.js';
import { ch_str } from '../primitive/ch_str.js';

export class DataChecker {
	static is_string(value) {
		return typeof value === 'string';
	}

	static is_ch_str(value) {
		return value instanceof ch_str;
	}

	static is_CLI_Option__file(value) {
		return value instanceof CLI_Option__file;
	}
}
