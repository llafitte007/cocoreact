import React from "react";
import { TableRow, TableCell } from "@material-ui/core";

export interface TableRowEmptyProps {
	colSpan: number;
	noDataLabel: string;
}

export default function TableRowEmpty({
	colSpan,
	noDataLabel
}: TableRowEmptyProps) {
	return (
		<TableRow>
			<TableCell colSpan={colSpan} scope="row">
				{noDataLabel}
			</TableCell>
		</TableRow>
	);
}
