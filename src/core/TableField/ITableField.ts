/* eslint-disable no-unused-vars */
import { Padding, SvgIconProps } from "@material-ui/core";
import { IField } from "../IField";

export type Align = "inherit" | "left" | "center" | "right" | "justify";

export interface ITableFieldBase extends IField {
	label?: string;
	align?: Align;
	padding?: Padding;
	scope?: string;
	icon?: React.ReactElement<SvgIconProps>;
	className?: string;
}

export interface ITableField<T> extends ITableFieldBase {
	render?: (fieldProps: ITableFieldRenderer<T>) => JSX.Element;
}

export interface ITableFieldRenderer<T> {
	fieldProps: ITableField<T>;
	data: T;
}
