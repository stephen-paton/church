import { DataRef_Read } from '../data/DataRef_Read.js';
import { DataRef_Write } from '../data/DataRef_Write.js';
import { DataType } from '../helpers/DataType.js';
import { System } from '../system/System.js';
import { TokenHelper } from './TokenHelper.js';

const VALUE = '@';

const MATCHER = /^@/;
let r_matcher = null;

export class Token_MacroStart {
	constructor() {}

	static try_match(w_char_index, r_source_code) {
		if (r_matcher === null) r_matcher = new DataRef_Read(MATCHER);

		const result = TokenHelper.try_match(w_char_index, r_source_code, r_matcher);

		if (!result.was_successful) return false;

		return new Token_MacroStart();
	}

	get val() {
		return VALUE;
	}

	get d_str() {
		return `Token<MacroStart>("${this.val}")`;
	}
}
