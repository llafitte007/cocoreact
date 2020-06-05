/* eslint-disable no-unused-vars */
import React, { useCallback } from "react";

import { FormWidget } from "../Form";
import {
	TypeWidgetOptions,
	IODataTableField,
	ODataFilterOperator
} from "../../core";
import HeaderFilterOperator from "./HeaderFilterOperator";

export interface HeaderFilterTableWidgetProps<TFormField, T> {
	field: IODataTableField<TFormField, T>;
	widgetOptions: TypeWidgetOptions;
	value: any;
	operator: ODataFilterOperator;
	onChange: (name: string, operator: ODataFilterOperator, value: any) => void;
}

export default function HeaderFilterTableWidget<TFormField, T>({
	widgetOptions,
	field,
	value,
	operator,
	onChange
}: HeaderFilterTableWidgetProps<TFormField, T>) {
	const operatorHandle = useCallback(
		(newOperator: ODataFilterOperator) =>
			onChange(field.name, newOperator, value),
		[field.name, onChange, value]
	);

	const valueHandle = useCallback(
		(name: string, newValue: any) => onChange(name, operator, newValue),
		[onChange, operator]
	);

	const operators = field.filter?.availableOperators ?? [];

	return (
		<FormWidget
			widgetOptions={widgetOptions}
			field={
				{
					...field,
					label: "",
					startAdornment: (
						<HeaderFilterOperator
							value={operator}
							operators={operators}
							onChange={operatorHandle}
						/>
					)
				} as any
			}
			errors={[]}
			data={{ [field.name]: value }}
			onChange={valueHandle}
		/>
	);
}
