package church

import vmem "core:mem/virtual"

CLI_Options :: struct {
	options: [dynamic]CLI_Option,
	arena: vmem.Arena,
}

CLI_Options__process :: proc(cli_options: ^CLI_Options, args: []string) {
	args := args[1:]

	allocator := vmem.arena_allocator(&cli_options^.arena)

	for try_match in CLI_Option__try_match {
		option, err := try_match(args, allocator)
		if err == ._FailedToMatch do continue

		append(&cli_options^.options, option)
		break
	}
}

CLI_Options__destroy :: proc(cli_options: ^CLI_Options) {
	vmem.arena_destroy(&cli_options^.arena)
	delete(cli_options^.options)
}
