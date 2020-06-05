/* eslint-disable no-unused-vars */
import { ODataFilterOperator } from "./ODataFilter";
import { ITableFieldBase } from "../TableField";

export interface IODataFilterFieldBase {
	delayAfterChange?: number;
	availableOperators?: ODataFilterOperator[];
}

export interface IODataTableFieldBase<TFormField> extends ITableFieldBase {
	sortable?: boolean;
	filterable?: boolean;
	filter?: Partial<IODataFilterFieldBase & TFormField>;
}

export interface IODataTableField<TFormField, T>
	extends IODataTableFieldBase<TFormField> {
	render?: (
		fieldProps: IODataTableFieldRenderer<TFormField, T>
	) => JSX.Element;
}

export interface IODataTableFieldRenderer<TFormField, T> {
	fieldProps: IODataTableField<TFormField, T>;
	data: T;
}
