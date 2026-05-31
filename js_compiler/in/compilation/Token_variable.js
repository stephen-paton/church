import { DataRef_Read } from '../data/DataRef_Read.js';
import { DataRef_Write } from '../data/DataRef_Write.js';
import { Cloner } from '../helpers/Cloner.js';
import { DataType } from '../helpers/DataType.js';
import { System } from '../system/System.js';
import { TokenHelper } from './TokenHelper.js';

const MATCHER = /^[a-z][a-z0-9]*(?:_(?:[a-z0-9]+))*/;
let r_matcher = null;

export class Token_variable {
	#value;

	constructor(value) {
		System.die_if_not_type(value, 'value', DataType.string, 'string', 'Token_closed_paren.constructor');

		this.#value = value;
	}

	static try_match(w_char_index, r_source_code) {
		if (r_matcher === null) r_matcher = new DataRef_Read(MATCHER);

		const result = TokenHelper.try_match(w_char_index, r_source_code, r_matcher);

		if (!result.was_successful) return false;

		return new Token_variable(result.matches[0]);
	}

	get val() {
		return Cloner.clone(this.#value);
	}
}
