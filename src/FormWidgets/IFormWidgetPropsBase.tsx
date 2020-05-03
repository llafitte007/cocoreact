/* eslint-disable no-unused-vars */
import { PropTypes } from "@material-ui/core";
import { IFormFieldBase } from "../core/FormField";
import { CSSProperties } from "@material-ui/styles";

export default interface IFormWidgetPropsBase<T = any> extends IFormFieldBase {
	value: T;
	error?: string;
	onChange?: (name: string, data: T) => void;

	fullWidth?: boolean;
	color?: PropTypes.Color;
	margin?: PropTypes.Margin;
	style?: CSSProperties;
}
