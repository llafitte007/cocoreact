/* eslint-disable no-unused-vars */
import React from "react";
import { TableRow, TableCell } from "@material-ui/core";

import { IODataTableField, OrderDirection } from "../../core";
import { HeaderTableWidget, HeaderSortableTableWidget } from "../TableWidgets";

export interface TableODataRowFieldsProps<TFormField, T> {
	fields: IODataTableField<TFormField, T>[];
	sortName?: string;
	sortDirection?: OrderDirection;
	onChange: (name: string) => void;
}

export default function TableODataRowFields<TFormField, T>({
	fields,
	sortName,
	sortDirection,
	onChange
}: TableODataRowFieldsProps<TFormField, T>) {
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
						{field.sortable && (
							<HeaderSortableTableWidget
								field={field}
								active={field.name === sortName}
								direction={sortDirection}
								onClick={onChange}
							/>
						)}
						{!field.sortable && <HeaderTableWidget {...field} />}
					</TableCell>
				);
			})}
		</TableRow>
	);
}
