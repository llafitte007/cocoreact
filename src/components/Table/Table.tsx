/* eslint-disable no-unused-vars */
import React from "react";
import { Padding, Table as MuiTable } from "@material-ui/core";

import TableHead from "./TableHead";
import TableBody, { TableBodyProps } from "./TableBody";
import TableBodyEmpty, { TableBodyEmptyProps } from "./TableBodyEmpty";
import { ClassesStyledComponent } from "../Theme";

export interface TableStyles {
	table: any;
	tableHead: any;
	tableBody: any;
}

export interface TableProps<T> extends ClassesStyledComponent<TableStyles> {
	padding?: Padding;
	className?: string;
	data: TableBodyProps<T>["data"];
	fields: TableBodyProps<T>["fields"];
	noDataLabel: TableBodyEmptyProps["noDataLabel"];
	widgetOptions: TableBodyProps<T>["widgetOptions"];
}

export default function Table<T>({
	padding,
	data,
	fields,
	noDataLabel,
	widgetOptions,
	className,
	classes
}: TableProps<T>) {
	return (
		<MuiTable padding={padding ?? "default"} className={className}>
			<TableHead fields={fields} className={classes?.tableHead} />

			{data.length > 0 ? (
				<TableBody<T>
					data={data}
					fields={fields}
					widgetOptions={widgetOptions}
					className={classes?.tableBody}
				/>
			) : (
				<TableBodyEmpty
					noDataLabel={noDataLabel}
					nbField={fields.length}
				/>
			)}
		</MuiTable>
	);
}
