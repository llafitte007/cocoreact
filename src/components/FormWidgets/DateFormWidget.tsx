/* eslint-disable no-unused-vars */
import React, { useCallback } from "react";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import MomentUtils from "@date-io/moment";
import { IFormWidgetPropsBase } from "./IFormWidgetPropsBase";

export interface DateFormWidgetProps extends IFormWidgetPropsBase<Date> {
	format?: string;
	minDate?: Date;
	maxDate?: Date;
	startAdornment?: React.ReactNode;
}

export default function DateFormWidget(props: DateFormWidgetProps) {
	const handleChange = useCallback(
		(d: MaterialUiPickersDate) => {
			if (d !== null && props.onChange) {
				props.onChange(props.name, d.toDate());
			}
		},
		[props.name, props.onChange]
	);

	return (
		<MuiPickersUtilsProvider utils={MomentUtils}>
			<DatePicker
				required={props.required}
				fullWidth={props.fullWidth}
				margin={props.margin}
				disabled={props.disabled}
				autoFocus={props.autoFocus}
				color={props.color as any}
				InputLabelProps={{ shrink: true }}
				aria-label={props.label}
				label={props.label}
				value={props.value}
				minDate={props.minDate}
				maxDate={props.maxDate}
				format={props.format}
				onChange={handleChange}
				error={props.error !== undefined}
				helperText={props.error}
				className={props.className}
				style={props.style}
				InputProps={{
					startAdornment: props.startAdornment,
					onClick: (e) => {
						if (
							props.startAdornment &&
							(e.target as any).nodeName !== "INPUT"
						) {
							e.stopPropagation();
							e.preventDefault();
						}
					}
				}}
			/>
		</MuiPickersUtilsProvider>
	);
}
