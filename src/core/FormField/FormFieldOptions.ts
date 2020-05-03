/* eslint-disable no-unused-vars */
import IFormField from "./IFormField";

export default class FormFieldOptions<T, TFieldOptions extends IFormField<T>> {
	private _fields: TFieldOptions[];

	constructor(fields: TFieldOptions[]) {
		this._fields = fields;
	}

	fields() {
		return this._fields;
	}
}
