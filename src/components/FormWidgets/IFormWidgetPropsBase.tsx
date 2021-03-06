/* eslint-disable no-unused-vars */
import { PropTypes } from "@material-ui/core";
import { IFormFieldBase } from "../../core/FormField";

export interface IFormWidgetPropsBase<T> extends IFormFieldBase {
	value: T;
	error?: string;
	onChange?: (name: string, data: T) => void;

	fullWidth?: boolean;
	color?: PropTypes.Color;
	margin?: PropTypes.Margin;
	style?: React.CSSProperties;
}
