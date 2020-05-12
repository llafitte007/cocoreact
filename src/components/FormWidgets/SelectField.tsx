/* eslint-disable no-unused-vars */
import React from "react";

import {
	FormControl,
	InputLabel,
	FormHelperText,
	Input,
	MenuItem,
	MenuProps as defaultMenuProps
} from "@material-ui/core";
import Select, { SelectProps } from "@material-ui/core/Select";
import { IFormWidgetPropsBase } from "./IFormWidgetPropsBase";

export interface SelectOption {
	label: any;
	value: any;
	enabled?: boolean;
}

export interface SelectFieldProps extends IFormWidgetPropsBase<any> {
	options?: SelectOption[];
	renderValue?: (value: SelectProps["value"]) => React.ReactNode;
	startAdornment?: React.ReactNode;
	MenuProps?: Partial<defaultMenuProps>;
}

export default function SelectField(props: SelectFieldProps) {
	return (
		<FormControl
			required={props.required}
			disabled={props.disabled}
			fullWidth={props.fullWidth}
			margin={props.margin}
			color={props.color as any}
			error={props.error !== undefined}
			className={props.className}
			style={props.style}
			aria-label={props.label}
		>
			{props.label && (
				<InputLabel htmlFor={props.name}>{props.label}</InputLabel>
			)}

			<Select
				autoFocus={props.autoFocus}
				value={props.value}
				onChange={(e) => {
					const value = e.target.value;
					props.onChange && props.onChange(props.name, value);
				}}
				input={
					<Input
						name={props.name}
						startAdornment={props.startAdornment}
					/>
				}
				inputProps={{ name: props.name }}
				MenuProps={{
					PaperProps: {
						style: {
							maxHeight: 250
						}
					},
					...props.MenuProps
				}}
				renderValue={props.renderValue}
			>
				{props.options &&
					props.options.map((opt) => (
						<MenuItem
							value={opt.value}
							key={opt.value}
							disabled={opt.enabled === false}
						>
							{opt.label}
						</MenuItem>
					))}
			</Select>

			{props.error && <FormHelperText>{props.error}</FormHelperText>}
		</FormControl>
	);
}
