package main

import "core:os"

import ch "lib"

main :: proc() {
	cli_options: ch.CLI_Options

	ch.CLI_Options__process(&cli_options, os.args)
	defer ch.CLI_Options__destroy(&cli_options)
}
