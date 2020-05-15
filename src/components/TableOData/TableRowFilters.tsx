/* eslint-disable no-unused-vars */
import React from "react";
import { TableRow, TableCell } from "@material-ui/core";

import {
	IODataTableField,
	ODataFilterOperator,
	TypeWidgetOptions
} from "../../core";
import HeaderFilter, { HeaderFilterProps } from "../TableWidgets/HeaderFilter";

export interface TableRowFiltersProps<T> {
	fields: IODataTableField<T>[];
	filtersValue: Record<string, any>;
	filtersOperator: Record<string, ODataFilterOperator>;
	widgetOptions: TypeWidgetOptions;
	onChange: HeaderFilterProps["onChange"];
}

export default function TableRowFilters<T>({
	fields,
	filtersValue,
	filtersOperator,
	widgetOptions,
	onChange
}: TableRowFiltersProps<T>) {
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
								value={filtersValue[field.name]}
								operator={filtersOperator[field.name]}
								onChange={onChange}
							/>
						)}
					</TableCell>
				);
			})}
		</TableRow>
	);
}
