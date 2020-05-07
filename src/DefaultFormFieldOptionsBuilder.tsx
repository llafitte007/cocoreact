/* eslint-disable no-unused-vars */
import { TextFieldProps } from "./components/FormWidgets/TextField";
import { SelectFieldProps } from "./components/FormWidgets/SelectField";
import { DateFieldProps } from "./components/FormWidgets/DateField";
import { TimeFieldProps } from "./components/FormWidgets/TimeField";
import { AutoCompleteFieldProps } from "./components/FormWidgets/AutoCompleteField";

import { FormFieldOptionsBuilder, IFormField } from "./core/FormField";
import IFormWidgetPropsBase from "./components/FormWidgets/IFormWidgetPropsBase";
import IField from "./core/Field/IField";
import { slugify } from "./StringExtension";

export interface IFormWidgetFieldOptions extends IFormField {
	fullWidth?: IFormWidgetPropsBase["fullWidth"];
	color?: IFormWidgetPropsBase["color"];
	margin?: IFormWidgetPropsBase["margin"];
	style?: IFormWidgetPropsBase["style"];

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
	startAdornment?: SelectFieldProps["startAdornment"];
}

export default class DefaultFormFieldOptionsBuilder<
	T
> extends FormFieldOptionsBuilder<T, IFormWidgetFieldOptions> {
	setDefaultAutoFocusEnabled(enabled: boolean) {
		super.setDefaultAutoFocusEnabled(enabled);
		return this;
	}

	initialize(formFields: IField[] | Record<string, IField>) {
		super.initialize(formFields);
		return this;
	}

	add(
		field: IField | IFormWidgetFieldOptions,
		options?: Partial<IFormWidgetFieldOptions>
	) {
		super.add(field, options);
		return this;
	}

	set(field: IField | string, options: Partial<IFormWidgetFieldOptions>) {
		super.set(field, options);
		return this;
	}

	hidden(formField: IField | string) {
		super.hidden(formField);
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
		} as IFormWidgetFieldOptions);

		this.set(slugFormField, {
			disabled: true
		} as IFormWidgetFieldOptions);

		return this;
	}
}

// TODO : make own app instance with this default settings exemple:
// position: 500,
// hidden: false,
// color: "secondary",
// autoComplete: "off",
// autoFocus: false,
// disabled: false,
// fullWidth: true,
// margin: "normal",
// required: true,
// label: field.name,
// label: capitalize(this.label),
// noOptionsText: capitalize(this.noOptionsText)
