/* eslint-disable no-unused-vars */
import React, { useMemo } from "react";
import ITableWidgetPropsBase from "./ITableWidgetPropsBase";
import { TableCell, IconButton, PropTypes, Button } from "@material-ui/core";

export interface ButtonFieldProps extends ITableWidgetPropsBase<any> {
	title?: string;
	href?: string;
	onClick?: (data: any) => void;
	color?: PropTypes.Color;
}

export default function ButtonField({
	align,
	padding,
	scope,
	icon,
	label,

	title,
	href,
	onClick,
	color
}: ButtonFieldProps) {
	const btnProps = useMemo(() => {
		return {
			title,
			href,
			onClick,
			color: color ?? "default"
		} as any;
	}, [title, href, onClick, color]);

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
