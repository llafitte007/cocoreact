/* eslint-disable no-unused-vars */
import React, { useMemo } from "react";
import { ITableWidgetPropsBase } from "./ITableWidgetPropsBase";
import {
	TableCell,
	IconButton,
	PropTypes,
	Button,
	ButtonTypeMap
} from "@material-ui/core";

export interface ButtonFieldProps<T = any> extends ITableWidgetPropsBase<T> {
	title?: string;
	href?: string | ((data: T) => string);
	onClick?: (data: T) => void;
	color?: PropTypes.Color;
	variant?: ButtonTypeMap["props"]["variant"];
}

export default function ButtonField({
	icon,
	label,
	value,
	href,
	...props
}: ButtonFieldProps) {
	const _href = useMemo(() => {
		if (href !== undefined) {
			return typeof href === "string" ? href : href(value);
		}
		return undefined;
	}, [href, value]);

	if (label === undefined || label === "") {
		return (
			<IconButton {...(props as any)} href={_href}>
				{icon}
			</IconButton>
		);
	}
	return (
		<Button {...(props as any)} href={_href} startIcon={icon}>
			{label}
		</Button>
	);
}
