/* eslint-disable no-unused-vars */
import React from "react";
import { IconButton, SvgIconProps } from "@material-ui/core";
import MuiTextField from "@material-ui/core/TextField";
import IFormWidgetPropsBase from "./IFormWidgetPropsBase";
import { CloseIcon } from "../Theme";

export interface TextFieldProps extends IFormWidgetPropsBase<string> {
	autoClearAdornment?: boolean;
	autoClearIcon?: React.ReactElement<SvgIconProps>;
	startAdornment?: React.ReactNode;
}

export default function TextField(props: TextFieldProps) {
	// TODO test force all props respect TextFieldProps !!! > use a function/hook to re-use in all widget
	return (
		<MuiTextField
			required={props.required}
			disabled={props.disabled}
			fullWidth={props.fullWidth}
			margin={props.margin}
			color={props.color as any}
			error={props.error !== undefined}
			helperText={props.error}
			className={props.className}
			style={props.style}
			aria-label={props.label}
			type={props.type}
			label={props.label}
			value={props.value}
			placeholder={props.placeholder}
			autoComplete={props.autoComplete}
			autoFocus={props.autoFocus}
			onChange={(e) => {
				const value = e.target.value;
				props.onChange && props.onChange(props.name, value);
			}}
			InputProps={{
				startAdornment: props.startAdornment,
				endAdornment: props.autoClearAdornment &&
					props.value &&
					props.value.length > 0 &&
					!props.disabled && (
						<IconButton
							size="small"
							onClick={() =>
								props.onChange && props.onChange(props.name, "")
							}
						>
							{props.autoClearIcon ?? <CloseIcon />}
						</IconButton>
					)
			}}
		/>
	);
}
