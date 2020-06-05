/* eslint-disable no-unused-vars */
import {
	DateTableWidgetProps,
	SwitchTableWidgetProps,
	ButtonTableWidgetProps,
	ITableWidgetPropsBase
} from "./components/TableWidgets";

import { IFieldOptionsBase, IField } from "./core/IField";
import { TableFieldOptionsBuilder, ITableField } from "./core/TableField";
import { capitalize } from "./StringExtension";

export interface ITableWidgetFieldOptions<T> extends ITableField<T> {
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

	custom(options: Partial<ITableWidgetFieldOptions<T> & IFieldOptionsBase>) {
		super.custom(options);
		return this;
	}

	hidden(field: IField | string) {
		super.hidden(field);
		return this;
	}
}
