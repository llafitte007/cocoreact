/* eslint-disable no-unused-vars */
import { IFormField } from "./IFormField";
import { IFieldSet, IField, IFieldOptionsBase } from "../IField";

export default class FormFieldOptionsBuilder<TFormField extends IFormField> {
	private _fieldset: IFieldSet<TFormField & IFieldOptionsBase>;
	private _defaultAutoFocus: boolean;
	private _defaultOptionsInitializer?: (options: TFormField) => TFormField;

	constructor(
		defaultAutoFocus: boolean = true,
		defaultOptionsInitializer?: (options: TFormField) => TFormField
	) {
		this._fieldset = new IFieldSet<TFormField & IFieldOptionsBase>();
		this._defaultAutoFocus = defaultAutoFocus;
		this._defaultOptionsInitializer = defaultOptionsInitializer;
	}

	initialize(
		fields: TFormField[] | Record<string, TFormField & IFieldOptionsBase>
	) {
		this._fieldset.initialize(fields);
		return this;
	}

	set(
		field: IField | string,
		options: Partial<TFormField & IFieldOptionsBase>
	) {
		this._fieldset.set(field, options);
		return this;
	}

	hidden(field: IField | string) {
		this._fieldset.hidden(field);
		return this;
	}

	setDefaultAutoFocusEnabled(enabled: boolean) {
		this._defaultAutoFocus = enabled;
		return this;
	}

	build() {
		let fields = this._fieldset.toList() as TFormField[];
		if (this._defaultOptionsInitializer) {
			const callback = this._defaultOptionsInitializer;
			fields = fields.map((f) => {
				return callback(f);
			}) as TFormField[];
		}
		if (this._defaultAutoFocus) {
			const idx = fields.findIndex((x) => x.autoFocus === true);
			if (idx === -1) {
				fields[0].autoFocus = true;
			}
		}
		return fields;
	}
}
