use atomic_lend_cell::AtomicBorrowCell;
use atomic_lend_cell::AtomicLendCell;

pub struct CLIOptionFile {
    path: AtomicLendCell<String>,
}

impl CLIOptionFile {
    pub fn new(path: &str) -> Self {
        Self {
            path: AtomicLendCell::new(path.to_string()),
        }
    }

    pub fn get_path(&self) -> AtomicBorrowCell<String> {
        self.path.borrow()
    }
}
