/* eslint-disable no-unused-vars */
import React, { useMemo } from "react";
import { TableCell } from "@material-ui/core";
import { ITableWidgetPropsBase } from "./ITableWidgetPropsBase";
import { ToggleOnIcon, ToggleOffIcon } from "../Theme";

export interface SwitchFieldProps extends ITableWidgetPropsBase<boolean> {
	labelOn?: string;
	labelOff?: string;
}

export default function SwitchField({
	value,
	align,
	padding,
	scope,
	labelOn,
	labelOff
}: SwitchFieldProps) {
	const content = useMemo(() => {
		return value === true ? (
			<ToggleOnIcon color="inherit" titleAccess="Oui" />
		) : (
			<ToggleOffIcon color="disabled" titleAccess="Non" />
		);
	}, []);

	const title = useMemo(() => {
		return value === true ? labelOn ?? "yes" : labelOff ?? "no";
	}, []);

	return (
		<TableCell align={align} padding={padding} scope={scope} title={title}>
			{content}
		</TableCell>
	);
}
