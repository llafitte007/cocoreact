/* eslint-disable no-unused-vars */
import {
	TextFormWidgetProps,
	SelectFormWidgetProps,
	DateFormWidgetProps,
	TimeFormWidgetProps,
	AutoCompleteFormWidgetProps,
	IFormWidgetPropsBase
} from "./components/FormWidgets";

import { IFieldOptionsBase, IField } from "./core/IField";
import { FormFieldOptionsBuilder, IFormField } from "./core/FormField";
import { slugify, capitalize } from "./StringExtension";

export interface IFormWidgetFieldOptions<T> extends IFormField<T> {
	fullWidth?: IFormWidgetPropsBase<T>["fullWidth"];
	color?: IFormWidgetPropsBase<T>["color"];
	margin?: IFormWidgetPropsBase<T>["margin"];
	style?: IFormWidgetPropsBase<T>["style"];

	autoClearAdornment?: TextFormWidgetProps["autoClearAdornment"];
	autoClearIcon?: TextFormWidgetProps["autoClearIcon"];
	options?:
		| SelectFormWidgetProps["options"]
		| AutoCompleteFormWidgetProps["options"];
	MenuProps?: SelectFormWidgetProps["MenuProps"];
	format?: DateFormWidgetProps["format"];
	minDate?: DateFormWidgetProps["minDate"];
	maxDate?: DateFormWidgetProps["maxDate"];
	minutesStep?: TimeFormWidgetProps["minutesStep"];
	groupBy?: AutoCompleteFormWidgetProps["groupBy"];
	noOptionsText?: AutoCompleteFormWidgetProps["noOptionsText"];
	startAdornment?:
		| TextFormWidgetProps["startAdornment"]
		| SelectFormWidgetProps["startAdornment"]
		| DateFormWidgetProps["startAdornment"];
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
