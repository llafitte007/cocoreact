/* eslint-disable no-unused-vars */
import React from "react";
import { TableRow, TableCell } from "@material-ui/core";

import { ITableField } from "../../core/TableField";
import { TypeWidgetOptions } from "../../core/TypeWidget";
import TableWidget from "./TableWidget";

export interface TableRowDataProps<
	T,
	TTableField extends ITableField<T> = ITableField<T>
> {
	data: T;
	fields: TTableField[];
	widgetOptions: TypeWidgetOptions;
}

export default function TableRowData<T>({
	data,
	fields,
	widgetOptions
}: TableRowDataProps<T>) {
	return (
		<TableRow>
			{fields.map((field: ITableField, fieldIdx) => {
				return (
					<TableCell
						align={field.align}
						padding={field.padding}
						scope={field.scope}
						key={fieldIdx}
					>
						<TableWidget
							field={field}
							data={data}
							widgetOptions={widgetOptions}
						/>
					</TableCell>
				);
			})}
		</TableRow>
	);
}
