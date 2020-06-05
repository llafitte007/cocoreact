/* eslint-disable no-unused-vars */
import { ODataFilterOperator } from "./ODataFilter";
import { ITableField } from "../TableField";

export interface IODataTableField<T = any> extends ITableField<T> {
	sortable?: boolean;
	filterable?: boolean;
	filterDelay?: number;
	filterOperators?: ODataFilterOperator[];
}

export interface IODataTableFieldRenderer<T> {
	fieldProps: IODataTableField<T>;
	data: T;
}
