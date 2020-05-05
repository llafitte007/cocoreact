/* eslint-disable no-unused-vars */
import React from "react";
import clsx from "clsx";
import {
	Theme,
	makeStyles,
	createStyles,
	Padding,
	darken,
	CircularProgress,
	Table as MuiTable,
	TableHead,
	TableBody,
	TableRow,
	TableCell
} from "@material-ui/core";

import { ITableField } from "../../core/TableField";
import { TypeWidgetOptions } from "../../core/TypeWidget";
import { StyledComponent } from "../Theme";
import TableWidget from "./TableWidget";
import TableHeader from "../TableWidgets/TableHeader";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		container: {
			position: "relative"
		},
		table: {
			"& tbody tr:nth-of-type(even)": {
				backgroundColor: theme.palette.background.default
			}
		},
		loadingContainer: {
			position: "absolute",
			width: "100%",
			height: "100%",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			backgroundColor: theme.palette.background.paper,
			opacity: 0.8,
			zIndex: theme.zIndex.appBar - 1
		},
		tableHead: {
			backgroundColor: darken(theme.palette.background.default, 0.2),
			color: theme.palette.getContrastText(
				darken(theme.palette.background.default, 0.2)
			)
		}
	} as TableStyles)
);

export interface TableStyles {
	container: any;
	table: any;
	loadingContainer: any;
	tableHead: any;
}

export interface TableConfiguration {
	widgetOptions: TypeWidgetOptions;
}

export interface TableProps<T> extends StyledComponent<TableStyles> {
	data: T[];
	fields: ITableField<T>[];
	noDataLabel: string;
	loading?: boolean;
	padding?: Padding;
}

export default function Table<T>({
	data,
	fields,
	loading,
	padding,
	noDataLabel,

	widgetOptions,

	className,
	classes,
	style
}: TableProps<T> & TableConfiguration) {
	const styles = useStyles() as TableStyles;

	const renderHeaderRow = React.useCallback(() => {
		return (
			<TableRow>
				{fields.map((field: ITableField, idx) => {
					return <TableHeader key={idx} {...field} />;
				})}
			</TableRow>
		);
	}, [fields]);

	const renderDataRow = React.useCallback(
		(data: any, key: number) => {
			return (
				<TableRow key={key}>
					{fields.map((field: ITableField, idx) => {
						return (
							<TableWidget
								key={key * fields.length + idx}
								field={field}
								data={data}
								widgetOptions={widgetOptions}
							/>
						);
					})}
				</TableRow>
			);
		},
		[fields]
	);

	const renderEmptyRow = React.useCallback(() => {
		return (
			<TableRow>
				<TableCell colSpan={fields.length} scope="row">
					{noDataLabel}
				</TableCell>
			</TableRow>
		);
	}, [fields, noDataLabel]);

	return (
		<div
			className={clsx(styles.container, classes?.container, className)}
			style={style}
		>
			{loading ? (
				<div
					className={clsx(
						styles.loadingContainer,
						classes?.loadingContainer
					)}
				>
					<CircularProgress size={28} />
				</div>
			) : null}

			<MuiTable
				className={clsx(styles.table, classes?.table)}
				padding={padding ?? "default"}
			>
				<TableHead
					className={clsx(styles.tableHead, classes?.tableHead)}
				>
					{renderHeaderRow()}
				</TableHead>

				<TableBody>
					{data.length === 0
						? renderEmptyRow()
						: data.map((d, idx) => renderDataRow(d, idx))}
				</TableBody>
			</MuiTable>
		</div>
	);
}
