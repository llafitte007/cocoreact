/* eslint-disable no-unused-vars */
import { Padding, SvgIconProps } from "@material-ui/core";

export type Align = "inherit" | "left" | "center" | "right" | "justify";

export interface ITableFieldBase {
	name: string;
	type: string;
	label?: string;
	align?: Align;
	padding?: Padding;
	scope?: string;
	icon?: React.ReactElement<SvgIconProps>;
	className?: string;
}

export default interface ITableField<T = any> extends ITableFieldBase {
	render?: (item: T) => JSX.Element;
}
