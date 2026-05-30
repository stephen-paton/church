package church

import "core:fmt"
import "core:os"
import "core:strings"

compile_file :: proc(option: CLI_Option__file) {
	path := option.path

	path_already_has_suffix := strings.ends_with(path, ".church")

	if !path_already_has_suffix do path = fmt.aprintf("%s.church", path)
	if !path_already_has_suffix do defer delete(path)

	if !os.is_file(path) do fmt.panicf("No church file could be found at '%s'", path)

	file_bytes, file_read_err := os.read_entire_file(path, allocator = context.allocator)
	if file_read_err != nil do fmt.panicf("Failed to read '%s'", path)
	defer delete(file_bytes)

	
}
