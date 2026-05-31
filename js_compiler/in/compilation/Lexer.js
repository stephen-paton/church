import { DataRef_Read } from '../data/DataRef_Read.js';
import { DataRef_Write } from '../data/DataRef_Write.js';
import { DataType } from '../helpers/DataType.js';
import { Strings } from '../helpers/Strings.js';
import { System } from '../system/System.js';
import { Token_closed_paren } from './Token_closed_paren.js';
import { Token_closed_square } from './Token_closed_square.js';
import { Token_open_paren } from './Token_open_paren.js';
import { Token_operator } from './Token_operator.js';
import { Token_open_square } from './Token_open_square.js';
import { Token_whitespace } from './Token_whitespace.js';

const TOKEN_TYPES = [
	Token_operator,
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
					token_list.push(result);
					break;
				}
			}

			if (!matched_token) System.die(`User Error :: Lexer.tokenise :: Unknown Token '${r_source_code.val[prev_char_index]}' encountered at [L:${line_index};C:${prev_char_index}]`);

			line_index += Strings.newline_count(r_source_code.val.slice(prev_char_index, w_char_index.val));
		}

		return token_list;
	}
}
