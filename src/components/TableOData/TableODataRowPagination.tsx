/* eslint-disable no-unused-vars */
import React, { useCallback } from "react";
import {
	TableRow,
	TablePagination,
	LabelDisplayedRowsArgs
} from "@material-ui/core";

import ODataPaginationActions from "./PaginationActions";

export interface TableODataRowPaginationProps {
	colSpan: number;
	count: number;
	page: number;
	rowsPerPage: number;
	rowsPerPageLabel: string;
	rowsPerPageOptions: number[];
	displayedRowLabel: (info: LabelDisplayedRowsArgs) => string;
	onChange: (page: number, rowPerPage: number) => void;
}

export default function TableODataRowPagination({
	page,
	rowsPerPage,
	displayedRowLabel,
	rowsPerPageLabel,
	onChange,
	...props
}: TableODataRowPaginationProps) {
	const handlePageChange = useCallback(
		(_e: any, page: number) => onChange(page, rowsPerPage),
		[onChange, rowsPerPage]
	);

	const handleRowsPerPageChange = useCallback(
		(e: any) => {
			const rowsPerPage = parseInt(e.target.value, 10);
			onChange(page, rowsPerPage);
		},
		[onChange, page]
	);

	return (
		<TableRow>
			<TablePagination
				{...props}
				page={page}
				labelRowsPerPage={rowsPerPageLabel}
				rowsPerPage={rowsPerPage}
				labelDisplayedRows={displayedRowLabel}
				onPageChange={handlePageChange}
				onRowsPerPageChange={handleRowsPerPageChange}
				ActionsComponent={ODataPaginationActions}
			/>
		</TableRow>
	);
}
