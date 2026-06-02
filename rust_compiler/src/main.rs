use rust_compiler::cli::CLIOption;
use rust_compiler::compilation::try_compile_file;

fn main() {
    let args: Vec<String> = std::env::args().collect();
    let args = &args[1..];

    let mut cli_options: Vec<CLIOption> = vec![];

    for arg in args.into_iter() { if let Some(cli_option) = CLIOption::try_from_arg(arg) { cli_options.push(cli_option); } else { panic!("'{}' is not a valid option", arg); }; }

    if let Some(CLIOption::File(file)) = cli_options.iter().find(|o| matches!(o, CLIOption::File(_))) {
        try_compile_file(file);
    } else {
        panic!("No ACTIVE option provided");
    };
}
