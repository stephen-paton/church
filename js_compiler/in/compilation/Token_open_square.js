import { DataRef_Read } from '../data/DataRef_Read.js';
import { DataRef_Write } from '../data/DataRef_Write.js';
import { Cloner } from '../helpers/Cloner.js';
import { DataType } from '../helpers/DataType.js';
import { System } from '../system/System.js';
import { TokenHelper } from './TokenHelper.js';

const VALUE = '[';

const MATCHER = /^\[/;
let r_matcher = null;

export class Token_open_square {
	constructor() {}

	static try_match(w_char_index, r_source_code) {
		if (r_matcher === null) r_matcher = new DataRef_Read(MATCHER);

		const result = TokenHelper.try_match(w_char_index, r_source_code, r_matcher);

		if (!result.was_successful) return false;

		return new Token_open_square();
	}

	get val() {
		return Cloner.clone(VALUE);
	}
}
