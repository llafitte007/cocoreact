/* eslint-disable no-unused-vars */
import React from "react";
import { TableRow, TableCell } from "@material-ui/core";

import { ITableField } from "../../core/TableField";
import HeaderField from "../TableWidgets/HeaderField";

export interface TableRowFieldsProps<T> {
	fields: ITableField<T>[];
}

export default function TableRowFields<T>({ fields }: TableRowFieldsProps<T>) {
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
						<HeaderField {...field} />
					</TableCell>
				);
			})}
		</TableRow>
	);
}
