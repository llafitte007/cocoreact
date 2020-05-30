/* eslint-disable no-unused-vars */
import { DateFieldProps } from "./components/TableWidgets/DateField";
import { SwitchFieldProps } from "./components/TableWidgets/SwitchField";
import { ButtonFieldProps } from "./components/TableWidgets/ButtonField";

import { IFieldOptionsBase, IField } from "./core/IField";
import { TableFieldOptionsBuilder } from "./core/TableField";
import { ITableWidgetPropsBase } from "./components/TableWidgets/ITableWidgetPropsBase";
import { IODataTableField } from "./core/OData";
import { capitalize } from "./StringExtension";

export interface ITableODataWidgetFieldOptions<T = any>
	extends IODataTableField<T> {
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

export function defaultTableODataFieldOptionsInitializer<T>(
	field: ITableODataWidgetFieldOptions<T>
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
	let filterDelay = field.filterDelay;
	if (
		filterDelay === undefined &&
		["string", "number", "email"].includes(field.type)
	) {
		filterDelay = 400;
	}
	return {
		...field,
		label,
		padding,
		align,
		color,
		variant,
		filterDelay
	} as ITableODataWidgetFieldOptions<T>;
}

export default class DefaultTableODataFieldOptionsBuilder<
	T
> extends TableFieldOptionsBuilder<ITableODataWidgetFieldOptions<T>> {
	constructor() {
		super(defaultTableODataFieldOptionsInitializer);
	}

	initialize(
		fields:
			| ITableODataWidgetFieldOptions<T>[]
			| Record<
					string,
					ITableODataWidgetFieldOptions<T> & IFieldOptionsBase
			  >
	) {
		super.initialize(fields);
		return this;
	}

	set(
		field: IField | string,
		options: Partial<ITableODataWidgetFieldOptions<T> & IFieldOptionsBase>
	) {
		super.set(field, options);
		return this;
	}

	hidden(field: IField | string) {
		super.hidden(field);
		return this;
	}
}
