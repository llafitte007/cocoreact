import React from "react";
import {
	TableBody as MuiTableBody,
	TableRow,
	TableCell
} from "@material-ui/core";

export interface TableBodyEmptyProps {
	nbField: number;
	noDataLabel: string;
}

export default function TableBodyEmpty({
	nbField,
	noDataLabel
}: TableBodyEmptyProps) {
	return (
		<MuiTableBody>
			<TableRow>
				<TableCell colSpan={nbField} scope="row">
					{noDataLabel}
				</TableCell>
			</TableRow>
		</MuiTableBody>
	);
}
