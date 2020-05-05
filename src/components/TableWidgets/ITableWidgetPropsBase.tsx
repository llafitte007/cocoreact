/* eslint-disable no-unused-vars */
import { ITableFieldBase } from "../../core/TableField";
import { CSSProperties } from "@material-ui/styles";

export default interface ITableWidgetPropsBase<T = any>
	extends ITableFieldBase {
	value: T;
	scope?: string;
	style?: CSSProperties;
}
