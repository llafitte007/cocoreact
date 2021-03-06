/* eslint-disable no-unused-vars */
import React, { useMemo } from "react";
import { ITableWidgetPropsBase } from "./ITableWidgetPropsBase";
import { ToggleOnIcon, ToggleOffIcon } from "../Theme";

export interface SwitchTableWidgetProps extends ITableWidgetPropsBase<boolean> {
	labelOn?: string;
	labelOff?: string;
}

export default function SwitchTableWidget({
	value,
	labelOn,
	labelOff
}: SwitchTableWidgetProps) {
	return useMemo(() => {
		return value === true ? (
			<ToggleOnIcon color="inherit" titleAccess={labelOn} />
		) : (
			<ToggleOffIcon color="disabled" titleAccess={labelOff} />
		);
	}, [value]);
}
