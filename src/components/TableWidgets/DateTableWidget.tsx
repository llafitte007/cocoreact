/* eslint-disable no-unused-vars */
import { useMemo } from "react";
import { ITableWidgetPropsBase } from "./ITableWidgetPropsBase";

export interface DateTableWidgetProps extends ITableWidgetPropsBase<Date> {
	formatter: (d: Date, format: string) => string;
	format?: string;
}

export default function DateTableWidget({
	formatter,
	format,
	align,
	padding,
	scope,
	...props
}: DateTableWidgetProps) {
	const value = useMemo(() => {
		return formatter(props.data, format ?? "dddd Do MMMM");
	}, [props.data, format, formatter]);

	return value;
}
