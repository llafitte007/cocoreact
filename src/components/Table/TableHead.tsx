/* eslint-disable no-unused-vars */
import React from "react";
import clsx from "clsx";
import {
	TableHead as MuiTableHead,
	TableRow,
	TableCell,
	makeStyles,
	createStyles,
	Theme,
	darken
} from "@material-ui/core";

import { ITableField } from "../../core/TableField";
import HeaderField from "../TableWidgets/HeaderField";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		tableHead: {
			backgroundColor: darken(theme.palette.background.default, 0.2),
			color: theme.palette.getContrastText(
				darken(theme.palette.background.default, 0.2)
			)
		}
	} as TableHeadStyles)
);

export interface TableHeadStyles {
	tableHead: any;
}

export interface TableHeadProps<T> {
	fields: ITableField<T>[];
	className?: string;
}

export default function TableHead<T>({ fields, className }: TableHeadProps<T>) {
	const styles = useStyles() as TableHeadStyles;

	return (
		<MuiTableHead className={clsx(styles.tableHead, className)}>
			<TableRow>
				{fields.map((field: ITableField, idx) => {
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
		</MuiTableHead>
	);
}
