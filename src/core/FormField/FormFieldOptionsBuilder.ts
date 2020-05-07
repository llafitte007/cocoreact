/* eslint-disable no-unused-vars */
import { FieldOptionsBuilder } from "../Field";
import IFormField from "./IFormField";
import FormFieldOptions from "./FormFieldOptions";

interface _IFormFieldOptions {
	position?: number;
	hidden?: boolean;
}

export default class FormFieldOptionsBuilder<
	T,
	TFormField extends IFormField<T> = IFormField<T>
> extends FieldOptionsBuilder<TFormField & _IFormFieldOptions> {
	private _defaultAutoFocus: boolean;

	constructor(
		defaultAutoFocus: boolean = true,
		defaultFieldBuilder?: (
			data: TFormField & _IFormFieldOptions
		) => TFormField & _IFormFieldOptions
	) {
		super(defaultFieldBuilder);
		this._defaultAutoFocus = defaultAutoFocus;
	}

	setDefaultAutoFocusEnabled(enabled: boolean) {
		this._defaultAutoFocus = enabled;
		return this;
	}

	build() {
		const fields = this.buildFields();

		if (this._defaultAutoFocus) {
			const autoFocusField = fields.find((x) => x.autoFocus === true);
			if (autoFocusField === undefined) {
				fields[0].autoFocus = true;
			}
		}

		return new FormFieldOptions<T, TFormField>(fields);
	}
}
