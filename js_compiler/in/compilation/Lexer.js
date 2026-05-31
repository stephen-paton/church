import { DataRef_Read } from '../data/DataRef_Read.js';
import { DataRef_Write } from '../data/DataRef_Write.js';
import { DataType } from '../helpers/DataType.js';
import { Strings } from '../helpers/Strings.js';
import { System } from '../system/System.js';
import { Token_closed_paren } from './Token_closed_paren.js';
import { Token_closed_square } from './Token_closed_square.js';
import { Token_enum_option } from './Token_enum_option.js';
import { Token_literal } from './Token_literal.js';
import { Token_lower_identifier } from './Token_lower_identifier.js';
import { Token_macro_start } from './Token_macro_start.js';
import { Token_namespace_end } from './Token_namespace_end.js';
import { Token_open_paren } from './Token_open_paren.js';
import { Token_operator_start } from './Token_operator_start.js';
import { Token_open_square } from './Token_open_square.js';
import { Token_proc_start } from './Token_proc_start.js';
import { Token_type_start } from './Token_type_start.js';
import { Token_upper_identifier } from './Token_upper_identifier.js';
import { Token_whitespace } from './Token_whitespace.js';
import { DataChecker } from '../helpers/DataChecker.js';

const TOKEN_TYPES = [
	Token_literal,
	Token_lower_identifier,
	Token_upper_identifier,
	Token_operator_start,
	Token_macro_start,
	Token_proc_start,
	Token_type_start,
	Token_enum_option,
	Token_namespace_end,
	Token_open_paren,
	Token_closed_paren,
	Token_open_square,
	Token_closed_square,
	Token_whitespace,
];

export class Lexer {
	static tokenise(r_source_code) {
		System.die_if_not_type(r_source_code, 'r_source_code', DataType.DataRef_Read, 'DataRef_Read', 'Lexer.tokenise');
		System.die_if_not_type(r_source_code.val, 'r_source_code.val', DataType.string, 'string', 'Lexer.tokenise');

		const token_list = [];

		const w_char_index = new DataRef_Write(0);
		let line_index = 0;

		while (w_char_index.val < r_source_code.val.length) {
			let matched_token = false;
			const prev_char_index = w_char_index.val;

			for (const TokenType of TOKEN_TYPES) {
				const result = TokenType.try_match(w_char_index, r_source_code);

				if (result === false) {
					continue;
				} else {
					matched_token = true;
					if (!DataChecker.is_type(result, DataType.Token_whitespace)) token_list.push(result);
					break;
				}
			}

			if (!matched_token) System.die(`User Error :: Lexer.tokenise :: Unknown Token '${r_source_code.val[prev_char_index]}' encountered at [L:${line_index};C:${prev_char_index}]`);

			line_index += Strings.newline_count(r_source_code.val.slice(prev_char_index, w_char_index.val));
		}

		return token_list;
	}
}
