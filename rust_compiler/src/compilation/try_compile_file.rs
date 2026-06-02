use std::fs;

use crate::cli::CLIOptionFile;

pub fn try_compile_file(file: &CLIOptionFile) {
    let path = file.get_path();
    let path = path.as_ref();
    let path = if path.ends_with(".church") { path.to_string() } else { format!("{}.church", path) };

    let source_code = fs::read_to_string(path.as_str()).unwrap_or_else(|err| { panic!("Could not open '{}': {}", path, err); });

    println!("{}", source_code);
}
