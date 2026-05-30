(#namespace bit: [
	(#enum 'b8 'u8 [
		_0 0b0000_0001
		_1 0b0000_0010
		_2 0b0000_0100
		_3 0b0000_1000
		_4 0b0001_0000
		_5 0b0010_0000
		_6 0b0100_0000
		_7 0b1000_0000
	])
	(#proc ~u8__is_on [value 'u8 bit 'b8] [
		(#return (#is_equal (#bitwise_and (#backing_from_enum bit) value) value))
	])
	(#proc_group ~is_on [
		~u8__is_on
	])
])
