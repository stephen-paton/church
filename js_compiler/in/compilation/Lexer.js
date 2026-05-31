import { DataRef_Read } from '../data/DataRef_Read.js';
import { DataRef_Write } from '../data/DataRef_Write.js';
import { DataType } from '../helpers/DataType.js';
import { Strings } from '../helpers/Strings.js';
import { System } from '../system/System.js';
import { Token_ClosedParen } from './Token_ClosedParen.js';
import { Token_ClosedSquare } from './Token_ClosedSquare.js';
import { Token_EnumOption } from './Token_EnumOption.js';
import { Token_Literal } from './Token_Literal.js';
import { Token_LowerIdentifier } from './Token_LowerIdentifier.js';
import { Token_MacroStart } from './Token_MacroStart.js';
import { Token_NamespaceEnd } from './Token_NamespaceEnd.js';
import { Token_OpenParen } from './Token_OpenParen.js';
import { Token_OperatorStart } from './Token_OperatorStart.js';
import { Token_OpenSquare } from './Token_OpenSquare.js';
import { Token_ProcStart } from './Token_ProcStart.js';
import { Token_TypeStart } from './Token_TypeStart.js';
import { Token_UpperIdentifier } from './Token_UpperIdentifier.js';
import { Token_Whitespace } from './Token_Whitespace.js';
import { DataChecker } from '../helpers/DataChecker.js';

const TOKEN_TYPES = [
	Token_Literal,
	Token_LowerIdentifier,
	Token_UpperIdentifier,
	Token_OperatorStart,
	Token_MacroStart,
	Token_ProcStart,
	Token_TypeStart,
	Token_EnumOption,
	Token_NamespaceEnd,
	Token_OpenParen,
	Token_ClosedParen,
	Token_OpenSquare,
	Token_ClosedSquare,
	Token_Whitespace,
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
					if (!DataChecker.is_type(result, DataType.Token_Whitespace)) token_list.push(result);
					break;
				}
			}

			if (!matched_token) System.die(`User Error :: Lexer.tokenise :: Unknown Token '${r_source_code.val[prev_char_index]}' encountered at [L:${line_index};C:${prev_char_index}]`);

			line_index += Strings.newline_count(r_source_code.val.slice(prev_char_index, w_char_index.val));
		}

		return token_list;
	}
}
