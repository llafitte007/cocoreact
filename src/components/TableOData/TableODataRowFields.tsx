/* eslint-disable no-unused-vars */
import React from "react";
import { TableRow, TableCell } from "@material-ui/core";

import { IODataTableField, OrderDirection } from "../../core";
import HeaderField from "../TableWidgets/HeaderField";
import HeaderFieldSortable from "../TableWidgets/HeaderFieldSortable";

export interface TableODataRowFieldsProps<T> {
	fields: IODataTableField<T>[];
	sortName?: string;
	sortDirection?: OrderDirection;
	onChange: (name: string) => void;
}

export default function TableODataRowFields<T>({
	fields,
	sortName,
	sortDirection,
	onChange
}: TableODataRowFieldsProps<T>) {
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
							<HeaderFieldSortable
								field={field}
								active={field.name === sortName}
								direction={sortDirection}
								onClick={onChange}
							/>
						)}
						{!field.sortable && <HeaderField {...field} />}
					</TableCell>
				);
			})}
		</TableRow>
	);
}
