/* eslint-disable no-unused-vars */
import React, { useCallback } from "react";
import { MuiPickersUtilsProvider, TimePicker } from "@material-ui/pickers";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import MomentUtils from "@date-io/moment";

import IFormWidgetPropsBase from "./IFormWidgetPropsBase";

export interface TimeFieldProps extends IFormWidgetPropsBase<string> {
	minutesStep?: number;
}

export default function TimeField(props: TimeFieldProps) {
	const handleChange = useCallback(
		(d: MaterialUiPickersDate) => {
			if (d && props.onChange) {
				const time = d.format("HH:mm");
				props.onChange(props.name, time);
			}
		},
		[props.name, props.onChange]
	);

	const timeToDate = useCallback((time: string) => {
		const timeParts = time.split(":").map((x) => parseInt(x, 10));
		const today = new Date();
		return new Date(
			today.getFullYear(),
			today.getMonth(),
			today.getDate(),
			timeParts[0],
			timeParts[1]
		);
	}, []);

	return (
		<MuiPickersUtilsProvider utils={MomentUtils}>
			<TimePicker
				required={props.required}
				disabled={props.disabled}
				fullWidth={props.fullWidth}
				margin={props.margin}
				color={props.color as any}
				className={props.className}
				style={props.style}
				aria-label={props.label}
				label={props.label}
				value={timeToDate(props.value)}
				autoComplete={props.autoComplete}
				autoFocus={props.autoFocus}
				ampm={false}
				minutesStep={props.minutesStep}
				onChange={handleChange}
				error={props.error !== undefined}
				helperText={props.error}
			/>
		</MuiPickersUtilsProvider>
	);
}
