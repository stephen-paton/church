import { readFileSync } from 'node:fs';

import { CLI_Option__file } from '../cli/CLI_Option__file.js';
import { Strings } from '../helpers/Strings.js';
import { System } from '../system/System.js';

export function compile_file(file_option) {
	System.die_if_not_type(file_option, 'file_option', CLI_Option__file, 'CLI_Option__file', 'compile_file');

	const path = Strings.concat_if_not_ends_with(file_option.path, '.church');

	let source_code;

	try {
		source_code = readFileSync(path, 'utf8');
	} catch(err) {
		switch (err.code) {
			case 'ENOENT':
				System.die(`User Error :: The file '${path}' does not exist`);
				break;
			case 'EISDIR':
				System.die(`User Error :: '${path}' is a directory, not a file`);
				break;
			case 'EACCES':
				System.die(`User Error :: You do not have access to the file '${path}'`);
				break;
			default:
				System.die(`OS Error :: Failed to read the file at '${path}'`);
				break;
		}
	}

	console.log(source_code);
}
