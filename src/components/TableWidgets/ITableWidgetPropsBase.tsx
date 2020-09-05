/* eslint-disable no-unused-vars */
import { ITableFieldBase } from "../../core/TableField";

export interface ITableWidgetPropsBase<T> extends ITableFieldBase {
	value: T;
	style?: React.CSSProperties;
}
