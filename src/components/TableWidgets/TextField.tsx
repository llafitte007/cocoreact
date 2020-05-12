/* eslint-disable no-unused-vars */
import React, { useMemo } from "react";
import { ITableWidgetPropsBase } from "./ITableWidgetPropsBase";
import { TableCell } from "@material-ui/core";

export interface TextFieldProps extends ITableWidgetPropsBase<any> {}

export default function TextField({
	align,
	padding,
	scope,
	...props
}: TextFieldProps) {
	const value = useMemo(() => "" + props.value, [props.value]);

	return (
		<TableCell align={align} padding={padding} scope={scope} title={value}>
			{value}
		</TableCell>
	);
}
