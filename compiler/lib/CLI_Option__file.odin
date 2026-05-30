package church

import "core:strings"

CLI_Option__file :: struct {
	path: string,
}

CLI_Option__file__try_match :: proc(args: []string, allocator := context.allocator) -> (option: CLI_Option, err: Err__Cli_Option__try_match) {
	err = ._FailedToMatch

	for arg in args {
		if !strings.starts_with(arg, CLI_Option__file__prefix) || len(arg) == len(CLI_Option__file__prefix) do continue

		path, was_allocation := strings.replace(arg, CLI_Option__file__prefix, "", 1, allocator = allocator)
		if !was_allocation do continue

		option = CLI_Option__file{ path = path }
		err = ._Ok
		break
	}

	return
}

@(private="file")
CLI_Option__file__prefix :: "file="
