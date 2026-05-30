import { CLI_Option__file } from './CLI_Option__file.js';
import { die } from '../system/die.js';

export class CLI_Options {
	static #option_constructors = [
		CLI_Option__file,
	];

	static from_args(args) {
		const options = [];

		while (args.length > 0) {
			let matched = false;

			for (const option_constructor of CLI_Options.#option_constructors) {
				const option = option_constructor.try_from_args(args);

				if (option === false) continue;

				matched = true;
				options.push(option);
				args = args.slice(1);

				if (args.length === 0) break;
			}

			if (!matched) die(`User Error :: '${args[0].val}' is not a valid compiler option`);
		}

		return options;
	}
}
