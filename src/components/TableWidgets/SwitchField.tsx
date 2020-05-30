/* eslint-disable no-unused-vars */
import React, { useMemo } from "react";
import { ITableWidgetPropsBase } from "./ITableWidgetPropsBase";
import { ToggleOnIcon, ToggleOffIcon } from "../Theme";

export interface SwitchFieldProps extends ITableWidgetPropsBase<boolean> {
	labelOn?: string;
	labelOff?: string;
}

export default function SwitchField({
	data,
	labelOn,
	labelOff
}: SwitchFieldProps) {
	return useMemo(() => {
		return data === true ? (
			<ToggleOnIcon color="inherit" titleAccess={labelOn} />
		) : (
			<ToggleOffIcon color="disabled" titleAccess={labelOff} />
		);
	}, [data]);
}
