package church

CLI_Option :: union {
	CLI_Option__file,
}

@(private="file")
CLI_Option_variant :: enum {
	_CLI_Option__file,
}

Err__Cli_Option__try_match :: enum {
	_Ok,
	_FailedToMatch,
}

CLI_Option__try_match := [CLI_Option_variant]proc(args: []string, allocator := context.allocator) -> (option: CLI_Option, err: Err__Cli_Option__try_match) {
	._CLI_Option__file = CLI_Option__file__try_match,
}
