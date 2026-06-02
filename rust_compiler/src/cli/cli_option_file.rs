use std::fmt::Display;

use atomic_lend_cell::AtomicBorrowCell;
use atomic_lend_cell::AtomicLendCell;

const PREFIX: &str = "file=";

pub struct CLIOptionFile {
    path: AtomicLendCell<String>,
}

impl CLIOptionFile {
    pub fn new(path: &str) -> Self {
        Self { path: AtomicLendCell::new(path.to_string()) }
    }

    pub fn try_from_arg(arg: &str) -> Option<Self> {
        let mut output: Option<Self> = None;

        if arg.starts_with(PREFIX) { output = Some(CLIOptionFile::new(&arg.replacen(PREFIX, "", 1))); }

        output
    }

    pub fn get_path(&self) -> AtomicBorrowCell<String> {
        self.path.borrow()
    }
}

impl Display for CLIOptionFile {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "CLIOption<File>(path: \"{}\")", self.get_path().as_ref())
    }
}
