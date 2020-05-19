/* eslint-disable no-unused-vars */
import { ITableFieldBase } from "../../core/TableField";
import { CSSProperties } from "@material-ui/styles";

export interface ITableWidgetPropsBase<T = any> extends ITableFieldBase {
	data: T;
	style?: CSSProperties;
}
