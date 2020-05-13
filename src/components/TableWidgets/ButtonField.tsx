/* eslint-disable no-unused-vars */
import React, { useMemo } from "react";
import { ITableWidgetPropsBase } from "./ITableWidgetPropsBase";
import { TableCell, IconButton, PropTypes, Button } from "@material-ui/core";

export interface ButtonFieldProps<T = any> extends ITableWidgetPropsBase<T> {
	title?: string;
	href?: string | ((data: T) => string);
	onClick?: (data: T) => void;
	color?: PropTypes.Color;
}

export default function ButtonField({
	align,
	padding,
	scope,
	icon,
	label,
	value,

	title,
	href,
	onClick,
	color
}: ButtonFieldProps) {
	const _href = useMemo(() => {
		if (href !== undefined) {
			return typeof href === "string" ? href : href(value);
		}
		return undefined;
	}, [href, value]);

	const btnProps = useMemo(() => {
		return {
			title,
			href: _href,
			onClick,
			color: color ?? "default"
		} as any;
	}, [title, _href, value, onClick, color]);

	return (
		<TableCell align={align} padding={padding ?? "checkbox"} scope={scope}>
			{label === undefined || label === "" ? (
				<IconButton {...btnProps}>{icon}</IconButton>
			) : (
				<Button {...btnProps} startIcon={icon}>
					{label}
				</Button>
			)}
		</TableCell>
	);
}
