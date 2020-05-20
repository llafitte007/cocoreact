/* eslint-disable no-unused-vars */
import React, { useMemo } from "react";
import { ITableWidgetPropsBase } from "./ITableWidgetPropsBase";
import {
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
	size?: ButtonTypeMap["props"]["size"];
}

export default function ButtonField({
	icon,
	label,
	data,
	href,
	...props
}: ButtonFieldProps) {
	const _href = useMemo(() => {
		if (href !== undefined) {
			return typeof href === "string" ? href : href(data);
		}
		return undefined;
	}, [href, data]);

	if (label === undefined || label === "") {
		return (
			<IconButton {...(props as any)} href={_href}>
				{icon ?? null}
			</IconButton>
		);
	}
	return (
		<Button {...(props as any)} href={_href} startIcon={icon}>
			{label}
		</Button>
	);
}
