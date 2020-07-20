/* eslint-disable no-unused-vars */
import { useMemo } from "react";
import { ITableWidgetPropsBase } from "./ITableWidgetPropsBase";

export interface TextTableWidgetProps extends ITableWidgetPropsBase<any> {}

export default function TextTableWidget({ data }: TextTableWidgetProps) {
	return useMemo(() => {
		return data ?? "";
	}, [data]);
}
