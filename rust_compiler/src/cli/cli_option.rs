use std::fmt::Display;

use super::CLIOptionFile;

pub enum CLIOption {
    File(CLIOptionFile),
}

impl CLIOption {
    pub fn try_from_arg(arg: &str) -> Option<CLIOption> {
        if let Some(file) = CLIOptionFile::try_from_arg(arg) { return Some(CLIOption::File(file)); };

        return None;
    }
}

impl Display for CLIOption {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        match self {
            Self::File(file) => write!(f, "{}", file),
        }
    }
}
