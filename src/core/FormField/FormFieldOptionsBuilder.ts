/* eslint-disable no-unused-vars */
import IFormField from "./IFormField";
import FormFieldOptions from "./FormFieldOptions";
import IField from "../types/IField";

interface _IFormFieldOptions {
	position?: number;
	hidden?: boolean;
}

export default class FormFieldOptionsBuilder<
	T,
	TFormField extends IFormField<T> = IFormField<T>
> {
	private _formFields: (TFormField & _IFormFieldOptions)[];
	private _defaultAutoFocus: boolean;
	private _defaultFieldBuilder?: (
		data: TFormField & _IFormFieldOptions
	) => TFormField & _IFormFieldOptions;

	constructor(
		defaultAutoFocus: boolean = true,
		defaultFieldBuilder?: (
			data: TFormField & _IFormFieldOptions
		) => TFormField & _IFormFieldOptions
	) {
		this._formFields = [];
		this._defaultAutoFocus = defaultAutoFocus;
		this._defaultFieldBuilder = defaultFieldBuilder;
	}

	setDefaultAutoFocusEnabled(enabled: boolean) {
		this._defaultAutoFocus = enabled;
		return this;
	}

	initialize(formFields: IField[] | Record<string, IField>) {
		if (Array.isArray(formFields)) {
			formFields.forEach((ff) => this.add(ff));
		} else {
			for (const k in formFields) {
				this.add(formFields[k]);
			}
		}
		return this;
	}

	add(
		field: IField | (TFormField & _IFormFieldOptions),
		options?: Partial<TFormField & _IFormFieldOptions>
	) {
		let newFormField = {
			...field,
			...options
		} as TFormField & _IFormFieldOptions;

		if (this._defaultFieldBuilder) {
			newFormField = this._defaultFieldBuilder(newFormField);
		}
		this._add(newFormField);
	}

	private _add(formField: TFormField & _IFormFieldOptions) {
		const sameName = this._get(formField.name);
		if (sameName !== undefined) {
			throw Error(
				`Another form field exists with same name ${name} and type ${sameName.type}`
			);
		}
		this._formFields.push(formField);
	}

	private _get(name: string) {
		return this._formFields.find((x) => x.name === name);
	}

	set(
		field: IField | string,
		options: Partial<TFormField & _IFormFieldOptions>
	) {
		let formField =
			typeof field === "string"
				? this._get(field)
				: this._get(field.name);

		if (formField === undefined) {
			throw Error(`Unknow form field with name ${name} founded`);
		}

		formField = { ...formField, options };
	}

	hidden(formField: IField | string) {
		this.set(formField, <TFormField & _IFormFieldOptions>{ hidden: true });
		return this;
	}

	build() {
		const fields = this._formFields
			.filter((f) => f.hidden !== true)
			.sort((a, b) => this._compare(a.position, b.position))
			.map((f) => {
				return ({ ...f } as unknown) as TFormField;
			});

		if (this._defaultAutoFocus) {
			const autoFocusField = fields.find((x) => x.autoFocus === true);
			if (autoFocusField === undefined) {
				fields[0].autoFocus = true;
			}
		}

		return new FormFieldOptions<T, TFormField>(fields);
	}

	private _compare(a: number | undefined, b: number | undefined) {
		if (a === undefined && b === undefined) {
			return 1;
		} else if (a === undefined && b !== undefined) {
			return 1;
		} else if (a !== undefined && b === undefined) {
			return -1;
		} else {
			return (a as number) - (b as number);
		}
	}
}
