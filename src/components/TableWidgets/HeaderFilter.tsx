/* eslint-disable no-unused-vars */
import React, { useCallback } from "react";

import { FormWidget } from "../Form";
import {
	TypeWidgetOptions,
	IODataTableField,
	ODataFilterOperator
} from "../../core";
import HeaderFilterOperator from "./HeaderFilterOperator";

export interface HeaderFilterProps {
	field: IODataTableField;
	widgetOptions: TypeWidgetOptions;
	value: any;
	operator: ODataFilterOperator;
	onChange: (name: string, operator: ODataFilterOperator, value: any) => void;
}

export default function HeaderFilter({
	widgetOptions,
	field,
	value,
	operator,
	onChange
}: HeaderFilterProps) {
	const operatorHandle = useCallback(
		(newOperator: ODataFilterOperator) =>
			onChange(field.name, newOperator, value),
		[field.name, onChange, value]
	);

	const valueHandle = useCallback(
		(name: string, newValue: any) => onChange(name, operator, newValue),
		[onChange, operator]
	);

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
							operators={field.filterOperators}
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
