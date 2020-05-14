/* eslint-disable no-unused-vars */
import React from "react";
import clsx from "clsx";
import {
	TableBody as MuiTableBody,
	TableRow,
	TableCell,
	makeStyles,
	createStyles,
	Theme
} from "@material-ui/core";

import { ITableField } from "../../core/TableField";
import { TypeWidgetOptions } from "../../core/TypeWidget";
import TableWidget from "./TableWidget";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		tableBody: {
			"& tr:nth-of-type(even)": {
				backgroundColor: theme.palette.background.default
			}
		}
	} as TableBodyStyles)
);

export interface TableBodyStyles {
	tableBody: any;
}

export interface TableBodyProps<
	T,
	TTableField extends ITableField<T> = ITableField<T>
> {
	data: T[];
	fields: TTableField[];
	widgetOptions: TypeWidgetOptions;
	className?: string;
}

export default function TableBody<T>({
	data,
	fields,
	widgetOptions,
	className
}: TableBodyProps<T>) {
	const styles = useStyles() as TableBodyStyles;

	return (
		<MuiTableBody className={clsx(styles.tableBody, className)}>
			{data.map((rowData, rowIdx) => {
				return (
					<TableRow key={rowIdx}>
						{fields.map((field: ITableField, fieldIdx) => {
							return (
								<TableCell
									align={field.align}
									padding={field.padding}
									scope={field.scope}
									key={rowIdx * fields.length + fieldIdx}
								>
									<TableWidget
										field={field}
										data={rowData}
										widgetOptions={widgetOptions}
									/>
								</TableCell>
							);
						})}
					</TableRow>
				);
			})}
		</MuiTableBody>
	);
}
