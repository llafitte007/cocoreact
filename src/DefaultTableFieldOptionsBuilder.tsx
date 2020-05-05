/* eslint-disable no-unused-vars */
import { TableFieldOptionsBuilder, ITableField } from "./core/TableField";
import ITableWidgetPropsBase from "./components/TableWidgets/ITableWidgetPropsBase";

export interface ITableWidgetFieldOptions extends ITableField {
	scope?: ITableWidgetPropsBase["scope"];
	style?: ITableWidgetPropsBase["style"];

	format?: DateFieldProps["format"];
}

export default class DefaultTableFieldOptionsBuilder<
	T
> extends TableFieldOptionsBuilder<T, ITableWidgetFieldOptions> {}

// TODO : make own app instance with this default settings exempe:

// label: field.name,
// label: capitalize(this.label),
// padding: "default"
// align: "left" | type number > right;
// padding?: "default" | button > "chechbox";
// icon?: React.ReactElement<SvgIconProps>;
// className?: string;
