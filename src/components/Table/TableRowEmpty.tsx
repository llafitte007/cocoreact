import React from "react";
import {
	TableBody as MuiTableBody,
	TableRow,
	TableCell
} from "@material-ui/core";

export interface TableRowEmptyProps {
	colSpan: number;
	noDataLabel: string;
}

export default function TableRowEmpty({
	colSpan,
	noDataLabel
}: TableRowEmptyProps) {
	return (
		<MuiTableBody>
			<TableRow>
				<TableCell colSpan={colSpan} scope="row">
					{noDataLabel}
				</TableCell>
			</TableRow>
		</MuiTableBody>
	);
}
