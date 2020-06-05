/* eslint-disable no-unused-vars */
import React from "react";
import { TableRow, TableCell } from "@material-ui/core";

import {
	IODataTableField,
	ODataFilterOperator,
	TypeWidgetOptions
} from "../../core";
import {
	HeaderFilterTableWidget,
	HeaderFilterTableWidgetProps
} from "../TableWidgets";

export interface TableODataRowFiltersProps<TFormField, T> {
	fields: IODataTableField<TFormField, T>[];
	filtersValues: Record<string, any>;
	filtersOperators: Record<string, ODataFilterOperator>;
	widgetOptions: TypeWidgetOptions;
	onChange: HeaderFilterTableWidgetProps<TFormField, T>["onChange"];
}

export default function TableODataRowFilters<TFormField, T>({
	fields,
	filtersValues,
	filtersOperators,
	widgetOptions,
	onChange
}: TableODataRowFiltersProps<TFormField, T>) {
	return (
		<TableRow>
			{fields.map((field, idx) => {
				return (
					<TableCell
						key={idx}
						align={field.align}
						padding={field.padding}
						scope="col"
					>
						{field.filterable && (
							<HeaderFilterTableWidget
								field={field}
								widgetOptions={widgetOptions}
								value={filtersValues[field.name]}
								operator={filtersOperators[field.name]}
								onChange={onChange}
							/>
						)}
					</TableCell>
				);
			})}
		</TableRow>
	);
}
