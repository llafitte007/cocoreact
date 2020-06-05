/* eslint-disable no-unused-vars */
import {
	DateTableWidgetProps,
	SwitchTableWidgetProps,
	ButtonTableWidgetProps,
	ITableWidgetPropsBase
} from "./components/TableWidgets";

import { IFieldOptionsBase, IField } from "./core/IField";
import { TableFieldOptionsBuilder } from "./core/TableField";
import { IODataTableField } from "./core/OData";
import { capitalize } from "./StringExtension";
import { IFormWidgetFieldOptions } from "./DefaultFormFieldOptionsBuilder";

export interface ITableODataWidgetFieldOptions<TFormField, T>
	extends IODataTableField<TFormField, T> {
	scope?: ITableWidgetPropsBase<T>["scope"];
	style?: ITableWidgetPropsBase<T>["style"];

	labelOn?: SwitchTableWidgetProps["labelOn"];
	labelOff?: SwitchTableWidgetProps["labelOff"];
	format?: DateTableWidgetProps["format"];
	formatter?: DateTableWidgetProps["formatter"];
	title?: ButtonTableWidgetProps<T>["title"];
	href?: ButtonTableWidgetProps<T>["href"];
	onClick?: ButtonTableWidgetProps<T>["onClick"];
	color?: ButtonTableWidgetProps<T>["color"];
	variant?: ButtonTableWidgetProps<T>["variant"];
	size?: ButtonTableWidgetProps<T>["size"];
}

export function defaultTableODataFieldOptionsInitializer<T>(
	field: ITableODataWidgetFieldOptions<IFormWidgetFieldOptions<T>, T>
) {
	let label = field.label;
	if (label !== "") {
		label = label ? capitalize(label) : capitalize(field.name);
	}
	let align = field.align;
	if (align === undefined) {
		align = field.type === "number" ? "right" : "left";
	}
	let padding = field.padding;
	if (padding === undefined) {
		padding = field.type === "button" ? "checkbox" : "default";
	}
	let color = field.color;
	let variant = field.variant;
	if (field.type === "button") {
		color = color ?? "default";
		variant = variant ?? "contained";
	}

	const options = {
		...field,
		label,
		padding,
		align,
		color,
		variant
	} as ITableODataWidgetFieldOptions<IFormWidgetFieldOptions<T>, T>;

	if (!field.filterable) {
		return options;
	}

	let filter = field.filter;
	if (filter === undefined) {
		filter = {};
	}

	filter.type = filter.type ?? field.type;
	filter.name = filter.name ?? field.name;
	filter.autoComplete = filter.autoComplete ?? "off";

	if (
		["string", "number", "email"].includes(filter.type) &&
		filter.delayAfterChange === undefined
	) {
		filter.delayAfterChange = 400;
	}

	return options;
}

export default class DefaultTableODataFieldOptionsBuilder<
	T
> extends TableFieldOptionsBuilder<
	ITableODataWidgetFieldOptions<IFormWidgetFieldOptions<T>, T>
> {
	constructor() {
		super(defaultTableODataFieldOptionsInitializer);
	}

	initialize(
		fields:
			| ITableODataWidgetFieldOptions<IFormWidgetFieldOptions<T>, T>[]
			| Record<
					string,
					ITableODataWidgetFieldOptions<
						IFormWidgetFieldOptions<T>,
						T
					> &
						IFieldOptionsBase
			  >
	) {
		super.initialize(fields);
		return this;
	}

	set(
		field: IField | string,
		options: Partial<
			ITableODataWidgetFieldOptions<IFormWidgetFieldOptions<T>, T> &
				IFieldOptionsBase
		>
	) {
		super.set(field, options);
		return this;
	}

	custom(
		options: Partial<
			ITableODataWidgetFieldOptions<IFormWidgetFieldOptions<T>, T> &
				IFieldOptionsBase
		>
	) {
		super.custom(options);
		return this;
	}

	hidden(field: IField | string) {
		super.hidden(field);
		return this;
	}
}
