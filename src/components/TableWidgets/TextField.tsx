/* eslint-disable no-unused-vars */
import { useMemo } from "react";
import { ITableWidgetPropsBase } from "./ITableWidgetPropsBase";

export interface TextFieldProps extends ITableWidgetPropsBase<any> {}

export default function TextField({
	align,
	padding,
	scope,
	...props
}: TextFieldProps) {
	const value = useMemo(() => {
		return "" + props.value;
	}, [props.value]);

	return value;
}
