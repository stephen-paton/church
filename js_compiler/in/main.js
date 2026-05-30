#!/usr/bin/env node
import { ch_str } from './primitive/ch_str.js';
import { CLI_Options } from './cli/CLI_Options.js';
import { compile_file } from './compilation/compile_file.js';
import { DataChecker } from './helper/DataChecker.js';

const args = process.argv.slice(2).map(arg => new ch_str(arg));
const options = CLI_Options.from_args(args);

for (const option of options) {
	if (DataChecker.is_CLI_Option__file(option)) {
		compile_file(option);
	}
}
