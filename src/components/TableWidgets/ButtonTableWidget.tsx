/* eslint-disable no-unused-vars */
import React, { useMemo, useCallback } from "react";
import { ITableWidgetPropsBase } from "./ITableWidgetPropsBase";
import {
	IconButton,
	PropTypes,
	Button,
	ButtonTypeMap
} from "@material-ui/core";

export interface ButtonTableWidgetProps<T> extends ITableWidgetPropsBase<T> {
	title?: string;
	href?: string | ((data: T) => string);
	onClick?: (data: T) => void;
	color?: PropTypes.Color;
	variant?: ButtonTypeMap["props"]["variant"];
	size?: ButtonTypeMap["props"]["size"];
}

export default function ButtonTableWidget<T>({
	icon,
	label,
	value,
	href,
	onClick,
	...props
}: ButtonTableWidgetProps<T>) {
	const _href = useMemo(() => {
		if (href !== undefined) {
			return typeof href === "string" ? href : href(value);
		}
		return undefined;
	}, [href, value]);

	const clickHandle = useCallback(
		(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
			if (onClick) {
				event.preventDefault();
				onClick && onClick(value);
			}
		},
		[onClick, value]
	);

	if (label === undefined || label === "") {
		return (
			<IconButton {...(props as any)} href={_href} onClick={clickHandle}>
				{icon ?? null}
			</IconButton>
		);
	}
	return (
		<Button
			{...(props as any)}
			href={_href}
			startIcon={icon}
			onClick={clickHandle}
		>
			{label}
		</Button>
	);
}
