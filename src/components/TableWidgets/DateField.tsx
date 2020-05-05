/* eslint-disable no-unused-vars */
import React, { useMemo } from "react";
import ITableWidgetPropsBase from "./ITableWidgetPropsBase";
import { TableCell } from "@material-ui/core";

export interface DateFieldProps extends ITableWidgetPropsBase<Date> {
	formatter: (d: Date, format: string) => string;
	format?: string;
}

export default function DateField({
	value,
	formatter,
	format,
	align,
	padding,
	scope
}: DateFieldProps) {
	const dateStr = useMemo(() => {
		return formatter(value, format ?? "dddd Do MMMM");
	}, [value, format, formatter]);

	return (
		<TableCell
			align={align}
			padding={padding}
			scope={scope}
			title={dateStr}
		>
			{dateStr}
		</TableCell>
	);
}
