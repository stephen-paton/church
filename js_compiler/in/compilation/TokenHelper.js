import { DataType } from '../helpers/DataType.js';
import { System } from '../system/System.js';

export class TokenHelper {
	static try_match(w_char_index, r_source_code, r_matcher) {
		System.die_if_not_type(w_char_index, 'w_char_index', DataType.DataRef_Write, 'DataRef_Write', 'TokenHelper.try_match');
		System.die_if_not_type(w_char_index.val, 'w_char_index.val', DataType.int, 'int', 'TokenHelper.try_match');
		
		System.die_if_not_type(r_source_code, 'r_source_code', DataType.DataRef_Read, 'DataRef_Read', 'TokenHelper.try_match');
		System.die_if_not_type(r_source_code.val, 'r_source_code.val', DataType.string, 'string', 'TokenHelper.try_match');

		System.die_if_not_type(r_matcher, 'r_matcher', DataType.DataRef_Read, 'DataRef_Read', 'TokenHelper.try_match');
		System.die_if_not_type(r_matcher.val, 'r_matcher.val', DataType.regex, 'regex', 'TokenHelper.try_match');

		if (w_char_index.val > (r_source_code.val.length - 1)) System.die(`Programmer Error :: TokenHelper.try_match :: char_index is greater than the length of source_code`);

		const matches = r_matcher.val.exec(r_source_code.val.slice([w_char_index.val]));

		if (matches === null) {
			return { was_successful: false };
		} else {
			w_char_index.val += matches[0].length;

			return { was_successful: true, matches: matches };
		}
	}
}
