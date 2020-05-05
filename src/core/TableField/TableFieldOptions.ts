/* eslint-disable no-unused-vars */
import ITableField from "./ITableField";

export default class TableFieldOptions<
	T,
	TFieldOptions extends ITableField<T>
> {
	private _fields: TFieldOptions[];

	constructor(fields: TFieldOptions[]) {
		this._fields = fields;
	}

	fields() {
		return this._fields;
	}
}
