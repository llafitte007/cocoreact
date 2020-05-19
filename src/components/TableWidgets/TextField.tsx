/* eslint-disable no-unused-vars */
import { useMemo } from "react";
import { ITableWidgetPropsBase } from "./ITableWidgetPropsBase";

export interface TextFieldProps extends ITableWidgetPropsBase<any> {}

export default function TextField({ data }: TextFieldProps) {
	return useMemo(() => {
		return "" + data;
	}, [data]);
}
