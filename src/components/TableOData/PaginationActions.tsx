/* eslint-disable no-unused-vars */
import React from "react";

import { createStyles, makeStyles, Theme } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import { TablePaginationActionsProps } from "@material-ui/core/TablePagination/TablePaginationActions";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			flexShrink: 0,
			color: theme.palette.text.secondary,
			marginLeft: theme.spacing(1) * 2.5
		}
	})
);

export default function ODataPaginationActions({
	count,
	page,
	rowsPerPage,
	onChangePage
}: TablePaginationActionsProps) {
	const classes = useStyles();

	const handleFirstPageButtonClick = (event: any) => {
		onChangePage(event, 0);
	};

	const handleBackButtonClick = (event: any) => {
		onChangePage(event, page - 1);
	};

	const handleNextButtonClick = (event: any) => {
		onChangePage(event, page + 1);
	};

	const handleLastPageButtonClick = (event: any) => {
		onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
	};

	return (
		<div className={classes.root}>
			<IconButton
				onClick={handleFirstPageButtonClick}
				disabled={page === 0}
				aria-label="first page"
			>
				<FirstPageIcon />
			</IconButton>

			<IconButton
				onClick={handleBackButtonClick}
				disabled={page === 0}
				aria-label="previous page"
			>
				<KeyboardArrowLeft />
			</IconButton>

			<IconButton
				onClick={handleNextButtonClick}
				disabled={page >= Math.ceil(count / rowsPerPage) - 1}
				aria-label="next page"
			>
				<KeyboardArrowRight />
			</IconButton>

			<IconButton
				onClick={handleLastPageButtonClick}
				disabled={page >= Math.ceil(count / rowsPerPage) - 1}
				aria-label="last page"
			>
				<LastPageIcon />
			</IconButton>
		</div>
	);
}
