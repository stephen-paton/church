import { readFileSync } from 'node:fs';

import { ch_str } from '../primitive/ch_str.js';
import { die } from '../system/die.js';

export function compile_file(file_option) {
	file_option.path.concat_if_not_ends_with('.church');

	let file_contents;

	try {
		file_contents = readFileSync(file_option.path.val, 'utf8');
	} catch(err) {
		switch (err.code) {
			case 'ENOENT':
				die(`User Error :: The file '${file_option.path.val}' does not exist`);
				break;
			case 'EISDIR':
				die(`User Error :: '${file_option.path.val}' is a directory, not a file`);
				break;
			case 'EACCES':
				die(`User Error :: You do not have access to the file '${file_option.path.val}'`);
				break;
			default:
				die(`OS Error :: Failed to read the file at '${file_option.path.val}'`);
				break;
		}
	}

	console.log(file_contents);
}
