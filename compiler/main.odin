package main

import "core:os"

import ch "lib"

main :: proc() {
	cli_options: ch.CLI_Options

	ch.CLI_Options__process(&cli_options, os.args)
	defer ch.CLI_Options__destroy(&cli_options)

	for option in cli_options.options {
		switch o in option {
			case ch.CLI_Option__file: ch.compile_file(o)
		}
	}
}
