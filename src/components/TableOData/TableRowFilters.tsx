/* eslint-disable no-unused-vars */
import React from "react";
import { TableRow, TableCell } from "@material-ui/core";

import {
	IODataTableField,
	ODataFilterOperator,
	TypeWidgetOptions
} from "../../core";
import { FormWidget } from "../Form";

export interface TableRowFiltersProps<T> {
	fields: IODataTableField<T>[];
	filtersValue: Record<string, any>;
	filtersOperator: Record<string, ODataFilterOperator>;
	widgetOptions: TypeWidgetOptions;
	onChange: (name: string, operator: ODataFilterOperator, value: any) => void;
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
							<FormWidget
								widgetOptions={widgetOptions}
								field={{
									...field.filterField,
									startAdornment: (
										<CellFilterOperator
											fieldName={field.name}
											operators={field.filterOperators}
											filter={filtersOperator[field.name]}
											onChange={handleOperatorChange}
										/>
									)
								}}
								errors={[]}
								data={filtersValue[field.name]}
								onChange={handleValueChange}
							/>
						)}
					</TableCell>
				);
			})}
		</TableRow>
	);
}
