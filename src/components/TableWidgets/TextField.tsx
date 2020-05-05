/* eslint-disable no-unused-vars */
import React from "react";
import ITableWidgetPropsBase from "./ITableWidgetPropsBase";

export interface TextFieldProps extends ITableWidgetPropsBase<string> {
}

export default function TextField({ value }: TextFieldProps) {
	return value;
}
