/* eslint-disable no-unused-vars */
import { DateFieldProps } from "./components/TableWidgets/DateField";
import { SwitchFieldProps } from "./components/TableWidgets/SwitchField";
import { ButtonFieldProps } from "./components/TableWidgets/ButtonField";

import { IFieldOptionsBase, IField } from "./core/IField";
import { TableFieldOptionsBuilder, ITableField } from "./core/TableField";
import { ITableWidgetPropsBase } from "./components/TableWidgets/ITableWidgetPropsBase";
import { capitalize } from "./StringExtension";

export interface ITableWidgetFieldOptions<T = any> extends ITableField<T> {
	scope?: ITableWidgetPropsBase["scope"];
	style?: ITableWidgetPropsBase["style"];

	labelOn?: SwitchFieldProps["labelOn"];
	labelOff?: SwitchFieldProps["labelOff"];
	format?: DateFieldProps["format"];
	formatter?: DateFieldProps["formatter"];
	title?: ButtonFieldProps<T>["title"];
	href?: ButtonFieldProps<T>["href"];
	onClick?: ButtonFieldProps<T>["onClick"];
	color?: ButtonFieldProps<T>["color"];
	variant?: ButtonFieldProps<T>["variant"];
	size?: ButtonFieldProps<T>["size"];
}

export function defaultTableFieldOptionsInitializer<T>(
	field: ITableWidgetFieldOptions<T>
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
	return {
		...field,
		label,
		padding,
		align,
		color,
		variant
	} as ITableWidgetFieldOptions<T>;
}

export default class DefaultTableFieldOptionsBuilder<
	T
> extends TableFieldOptionsBuilder<ITableWidgetFieldOptions<T>> {
	constructor() {
		super(defaultTableFieldOptionsInitializer);
	}

	initialize(
		fields:
			| ITableWidgetFieldOptions<T>[]
			| Record<string, ITableWidgetFieldOptions<T> & IFieldOptionsBase>
	) {
		super.initialize(fields);
		return this;
	}

	set(
		field: IField | string,
		options: Partial<ITableWidgetFieldOptions<T> & IFieldOptionsBase>
	) {
		super.set(field, options);
		return this;
	}

	hidden(field: IField | string) {
		super.hidden(field);
		return this;
	}
}
