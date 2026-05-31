import { CLI_Option__file } from './CLI_Option__file.js';
import { System } from '../system/System.js';

const OPTION_CONSTRUCTORS = [
	CLI_Option__file,
];

export class CLI_Options {
	static from_args(args) {
		System.die_if_not_array_of_type(args, 'args', String, 'string', 'CLI_Options.from_args');

		const options = [];

		while (args.length > 0) {
			let matched = false;

			for (const option_constructor of OPTION_CONSTRUCTORS) {
				const option = option_constructor.try_from_args(args);

				if (option === false) continue;

				matched = true;
				options.push(option);
				args = args.slice(1);

				if (args.length === 0) break;
			}

			if (!matched) System.die(`User Error :: '${args[0].val}' is not a valid compiler option`);
		}

		return options;
	}
}
