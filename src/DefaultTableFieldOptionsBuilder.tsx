/* eslint-disable no-unused-vars */
import { DateFieldProps } from "./components/TableWidgets/DateField";
import { SwitchFieldProps } from "./components/TableWidgets/SwitchField";
import { ButtonFieldProps } from "./components/TableWidgets/ButtonField";

import { TableFieldOptionsBuilder, ITableField } from "./core/TableField";
import ITableWidgetPropsBase from "./components/TableWidgets/ITableWidgetPropsBase";

export interface ITableWidgetFieldOptions extends ITableField {
	scope?: ITableWidgetPropsBase["scope"];
	style?: ITableWidgetPropsBase["style"];

	labelOn?: SwitchFieldProps["labelOn"];
	labelOff?: SwitchFieldProps["labelOff"];
	format?: DateFieldProps["format"];
	formatter?: DateFieldProps["formatter"];
	title?: ButtonFieldProps["title"];
	href?: ButtonFieldProps["href"];
	onClick?: ButtonFieldProps["onClick"];
	color?: ButtonFieldProps["color"];
}

export default class DefaultTableFieldOptionsBuilder<
	T
> extends TableFieldOptionsBuilder<T, ITableWidgetFieldOptions> {}

// TODO : make own app instance with this default settings exemple:
// label: field.name,
// label: capitalize(this.label),
// padding: "default"
// align: "left" | type number > right;
// padding?: "default" | button > "chechbox";
// icon?: React.ReactElement<SvgIconProps>;
// className?: string;
