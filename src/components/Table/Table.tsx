/* eslint-disable no-unused-vars */
import React from "react";
import clsx from "clsx";
import {
	Padding,
	Table as MuiTable,
	TableHead as MuiTableHead,
	TableBody as MuiTableBody,
	makeStyles,
	createStyles,
	Theme,
	darken
} from "@material-ui/core";

import TableRowFields, { TableRowFieldsProps } from "./TableRowFields";
import TableRowData, { TableRowDataProps } from "./TableRowData";
import TableRowEmpty, { TableRowEmptyProps } from "./TableRowEmpty";
import { StyledComponent } from "../Theme";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		table: {},
		tableHead: {
			backgroundColor: darken(theme.palette.background.default, 0.2),
			color: theme.palette.getContrastText(
				darken(theme.palette.background.default, 0.2)
			)
		},
		tableBody: {
			"& tr:nth-of-type(even)": {
				backgroundColor: theme.palette.background.default
			}
		}
	} as TableStyles)
);

export interface TableStyles {
	table: any;
	tableHead: any;
	tableBody: any;
}

export interface TableProps<T> extends StyledComponent<TableStyles> {
	padding?: Padding;
	className?: string;
	data: T[];
	fields: TableRowFieldsProps<T>["fields"];
	noDataLabel: TableRowEmptyProps["noDataLabel"];
	widgetOptions: TableRowDataProps<T>["widgetOptions"];
}

export default function Table<T>({
	padding,
	data,
	fields,
	noDataLabel,
	widgetOptions,
	className,
	classes,
	style
}: TableProps<T>) {
	const styles = useStyles() as TableStyles;

	return (
		<MuiTable
			padding={padding ?? "normal"}
			className={className}
			style={style}
		>
			<MuiTableHead
				className={clsx(styles.tableHead, classes?.tableHead)}
			>
				<TableRowFields fields={fields} />
			</MuiTableHead>

			<MuiTableBody
				className={clsx(styles.tableBody, classes?.tableBody)}
			>
				{data.length === 0 && (
					<TableRowEmpty
						noDataLabel={noDataLabel}
						colSpan={fields.length}
					/>
				)}

				{data.length > 0 &&
					data.map((dataRow, idx) => (
						<TableRowData<T>
							key={idx}
							data={dataRow}
							fields={fields}
							widgetOptions={widgetOptions}
						/>
					))}
			</MuiTableBody>
		</MuiTable>
	);
}
