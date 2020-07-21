/* eslint-disable no-unused-vars */
import { useMemo } from "react";
import { ITableWidgetPropsBase } from "./ITableWidgetPropsBase";

export interface TextTableWidgetProps extends ITableWidgetPropsBase<any> { }

export default function TextTableWidget({ value: data }: TextTableWidgetProps) {
	return useMemo(() => data ?? "", [data]);
}
