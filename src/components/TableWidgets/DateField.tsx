/* eslint-disable no-unused-vars */
import React, { useMemo } from "react";
import { ITableWidgetPropsBase } from "./ITableWidgetPropsBase";
import { TableCell } from "@material-ui/core";

export interface DateFieldProps extends ITableWidgetPropsBase<Date> {
	formatter: (d: Date, format: string) => string;
	format?: string;
}

export default function DateField({
	formatter,
	format,
	align,
	padding,
	scope,
	...props
}: DateFieldProps) {
	const value = useMemo(() => {
		return formatter(props.value, format ?? "dddd Do MMMM");
	}, [props.value, format, formatter]);

	return (
		<TableCell align={align} padding={padding} scope={scope} title={value}>
			{value}
		</TableCell>
	);
}
