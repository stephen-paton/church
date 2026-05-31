export class DataChecker {
	static is_type(value, expected_type) {
		switch (expected_type) {
			case String:
				return typeof value === 'string';
			default:
				return value instanceof expected_type;
		}
	}

	static is_array_of_type(value, expected_type) {
		return Array.isArray(value) && value.every(v => DataChecker.is_type(v, expected_type));
	}
}
