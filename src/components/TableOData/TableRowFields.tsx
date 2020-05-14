/* eslint-disable no-unused-vars */
import React from "react";
import { TableRow, TableCell, TableSortLabel } from "@material-ui/core";

import { IODataTableField, OrderDirection } from "../../core";
import HeaderField from "../TableWidgets/HeaderField";

export interface TableRowFieldsProps<T> {
	fields: IODataTableField<T>[];
	sortName?: string;
	sortDirection?: OrderDirection;
	onChange: (name: string) => void;
}

export default function TableRowFields<T>({
	fields,
	sortName,
	sortDirection,
	onChange
}: TableRowFieldsProps<T>) {
	return (
		<TableRow>
			{fields.map((field, idx) => {
				if (field.sortable) {
					return (
						<TableCell
							key={idx}
							align={field.align}
							padding={field.padding}
							scope="col"
						>
							<TableSortLabel
								active={field.name === sortName}
								direction={sortDirection}
								onClick={() => onChange(field.name)}
							>
								<HeaderField {...field} />
							</TableSortLabel>
						</TableCell>
					);
				}
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
