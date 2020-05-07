/* eslint-disable no-unused-vars */
import IField from "./IField";

export default class FieldOptions<TField extends IField> {
	protected _fields: TField[];

	constructor(field: TField[]) {
		this._fields = field;
	}

	fields() {
		return this._fields;
	}
}
