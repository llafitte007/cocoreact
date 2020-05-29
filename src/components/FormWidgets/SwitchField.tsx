/* eslint-disable no-unused-vars */
import React, { Fragment } from "react";
import {
	FormControl,
	FormControlLabel,
	Switch,
	Typography,
	FormHelperText
} from "@material-ui/core";

import { IFormWidgetPropsBase } from "./IFormWidgetPropsBase";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
	labelContainer: {
		marginLeft: 0,
		marginRight: "auto"
	},
	placeholder: {
		display: "block"
	}
} as SwitchFieldStyles);

export interface SwitchFieldStyles {
	placeholder: any;
	labelContainer: any;
}

export interface SwitchFieldProps extends IFormWidgetPropsBase<boolean> {}

export default function SwitchField(props: SwitchFieldProps) {
	const styles = useStyles() as SwitchFieldStyles;

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
			<FormControlLabel
				disabled={props.disabled}
				control={
					<Switch
						autoFocus={props.autoFocus}
						checked={props.value}
						color={props.color as any}
						onChange={(e) => {
							const value = e.currentTarget.checked as boolean;
							props.onChange && props.onChange(props.name, value);
						}}
					/>
				}
				value={props.name}
				label={
					<Fragment>
						{props.label && (
							<Typography variant="subtitle1">
								{props.label ?? ""}
								{props.required ? " *" : ""}
							</Typography>
						)}
						{props.placeholder && (
							<Typography
								variant="caption"
								className={styles.placeholder}
							>
								{props.placeholder}
							</Typography>
						)}
					</Fragment>
				}
				labelPlacement="start"
				className={styles.labelContainer}
			/>

			{props.error && <FormHelperText>{props.error}</FormHelperText>}
		</FormControl>
	);
}
