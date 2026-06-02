use rust_compiler::cli::{self, CLIOption};

fn main() {
    let args: Vec<String> = std::env::args().collect();
    let args = &args[1..];

    let mut cli_options: Vec<CLIOption> = vec![];

    for arg in args.into_iter() { if let Some(cli_option) = CLIOption::try_from_arg(arg) { cli_options.push(cli_option); } else { panic!("'{}' is not a valid option", arg); }; }

    for cli_option in cli_options { println!("{}", cli_option); }
}
