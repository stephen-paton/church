#!/usr/bin/env node
import sourceMapSupport from 'source-map-support';
import { CLI_Option__file } from './cli/CLI_Option__file.js';
import { CLI_Options } from './cli/CLI_Options.js';
import { compile_file } from './compilation/compile_file.js';
import { DataChecker } from './helpers/DataChecker.js';
import { DataType } from './helpers/DataType.js';

sourceMapSupport.install();

const args = process.argv.slice(2);
const options = CLI_Options.from_args(args);

for (const option of options) {
	if (DataChecker.is_type(option, DataType.CLI_Option__file)) {
		compile_file(option);
	}
}
