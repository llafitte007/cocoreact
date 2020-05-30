/* eslint-disable no-unused-vars */
import React from "react";
import { TableRow, TableCell } from "@material-ui/core";

import {
	IODataTableField,
	ODataFilterOperator,
	TypeWidgetOptions
} from "../../core";
import HeaderFilter, { HeaderFilterProps } from "../TableWidgets/HeaderFilter";

export interface TableODataRowFiltersProps<T> {
	fields: IODataTableField<T>[];
	filtersValues: Record<string, any>;
	filtersOperators: Record<string, ODataFilterOperator>;
	widgetOptions: TypeWidgetOptions;
	onChange: HeaderFilterProps["onChange"];
}

export default function TableODataRowFilters<T>({
	fields,
	filtersValues,
	filtersOperators,
	widgetOptions,
	onChange
}: TableODataRowFiltersProps<T>) {
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
							<HeaderFilter
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
