/* eslint-disable no-unused-vars */
import { TextFieldProps } from "./components/FormWidgets/TextField";
import { SelectFieldProps } from "./components/FormWidgets/SelectField";
import { DateFieldProps } from "./components/FormWidgets/DateField";
import { TimeFieldProps } from "./components/FormWidgets/TimeField";
import { AutoCompleteFieldProps } from "./components/FormWidgets/AutoCompleteField";

import { IFieldOptionsBase, IField } from "./core/IField";
import { FormFieldOptionsBuilder, IFormField } from "./core/FormField";
import { IFormWidgetPropsBase } from "./components/FormWidgets/IFormWidgetPropsBase";
import { slugify, capitalize } from "./StringExtension";

export interface IFormWidgetFieldOptions<T> extends IFormField<T> {
	fullWidth?: IFormWidgetPropsBase<T>["fullWidth"];
	color?: IFormWidgetPropsBase<T>["color"];
	margin?: IFormWidgetPropsBase<T>["margin"];
	style?: IFormWidgetPropsBase<T>["style"];

	autoClearAdornment?: TextFieldProps["autoClearAdornment"];
	autoClearIcon?: TextFieldProps["autoClearIcon"];
	options?: SelectFieldProps["options"] | AutoCompleteFieldProps["options"];
	MenuProps?: SelectFieldProps["MenuProps"];
	format?: DateFieldProps["format"];
	minDate?: DateFieldProps["minDate"];
	maxDate?: DateFieldProps["maxDate"];
	minutesStep?: TimeFieldProps["minutesStep"];
	groupBy?: AutoCompleteFieldProps["groupBy"];
	noOptionsText?: AutoCompleteFieldProps["noOptionsText"];
	startAdornment?:
		| TextFieldProps["startAdornment"]
		| SelectFieldProps["startAdornment"]
		| DateFieldProps["startAdornment"];
}

export function defaultFormFieldOptionsInitializer<T>(
	field: IFormWidgetFieldOptions<T>
) {
	let label = field.label;
	if (label !== "") {
		label = label ? capitalize(label) : capitalize(field.name);
	}
	return {
		...field,
		label,
		required: field.required ?? true,
		margin: field.margin ?? "normal",
		color: field.color ?? "secondary",
		autoComplete: field.autoComplete ?? "off",
		autoFocus: field.autoFocus ?? false,
		disabled: field.disabled ?? false,
		fullWidth: field.fullWidth ?? true,
		noOptionsText: field.noOptionsText
			? capitalize(field.noOptionsText)
			: undefined
	} as IFormWidgetFieldOptions<T>;
}

export default class DefaultFormFieldOptionsBuilder<
	T
> extends FormFieldOptionsBuilder<IFormWidgetFieldOptions<T>> {
	constructor() {
		super(true, defaultFormFieldOptionsInitializer);
	}

	initialize(
		fields:
			| IFormWidgetFieldOptions<T>[]
			| Record<string, IFormWidgetFieldOptions<T> & IFieldOptionsBase>
	) {
		super.initialize(fields);
		return this;
	}

	set(
		field: IField | string,
		options: Partial<IFormWidgetFieldOptions<T> & IFieldOptionsBase>
	) {
		super.set(field, options);
		return this;
	}

	custom(options: Partial<IFormWidgetFieldOptions<T> & IFieldOptionsBase>) {
		super.custom(options);
		return this;
	}

	hidden(field: IField | string) {
		super.hidden(field);
		return this;
	}

	setDefaultAutoFocusEnabled(enabled: boolean) {
		super.setDefaultAutoFocusEnabled(enabled);
		return this;
	}

	attachFieldToSlug(
		srcformField: IField | string,
		slugFormField: IField | string
	) {
		const srcName =
			typeof srcformField === "string" ? srcformField : srcformField.name;
		const slugName =
			typeof slugFormField === "string"
				? slugFormField
				: slugFormField.name;

		this.set(srcformField, {
			onChange: (item: T) => {
				item[slugName] = slugify(item[srcName]);
				return item;
			}
		} as IFormWidgetFieldOptions<T>);

		this.set(slugFormField, {
			disabled: true
		} as IFormWidgetFieldOptions<T>);

		return this;
	}
}
