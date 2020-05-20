/* eslint-disable no-unused-vars */
import React, { useCallback } from "react";
import Autocomplete, {
	createFilterOptions
} from "@material-ui/lab/Autocomplete";

import { TextField, Theme, makeStyles, createStyles } from "@material-ui/core";
import { IFormWidgetPropsBase } from "./IFormWidgetPropsBase";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		groupLabel: {
			fontSize: theme.typography.caption.fontSize,
			textTransform: "uppercase",
			fontStyle: "italic",
			fontWeight: "bold"
		},
		groupOption: {
			paddingLeft: theme.spacing(1) * 3
		}
	} as AutoCompleteStyles)
);

export interface AutoCompleteStyles {
	groupLabel: any;
	groupOption: any;
}

export interface AutoCompleteOption {
	label: any;
	value: any;
}

export interface AutoCompleteFieldProps extends IFormWidgetPropsBase<any> {
	options: AutoCompleteOption[];
	noOptionsText?: string;
	groupBy?: (option: AutoCompleteOption) => string;
}

const filterOptions = createFilterOptions({
	stringify: (option: AutoCompleteOption) => option.label
});

export default function AutoCompleteField(props: AutoCompleteFieldProps) {
	const classes = useStyles() as AutoCompleteStyles;

	const value =
		props.options && props.options.find((x) => x.value === props.value);

	const handleChange = useCallback(
		(_e: any, v: AutoCompleteOption | null) => {
			if (v !== null && props.onChange) {
				props.onChange && props.onChange(props.name, v.value);
			}
		},
		[props.name, props.onChange]
	);

	return (
		<Autocomplete<AutoCompleteOption>
			options={props.options}
			getOptionLabel={(option) => option.label}
			onChange={handleChange}
			value={value}
			noOptionsText={props.noOptionsText}
			groupBy={props.groupBy}
			getOptionSelected={(option, value) => option.value === value.value}
			filterOptions={filterOptions}
			classes={{
				groupLabel: classes.groupLabel,
				option: props.groupBy ? classes.groupOption : undefined
			}}
			className={props.className}
			style={props.style}
			autoComplete={props.autoComplete !== "off"}
			disabled={props.disabled}
			fullWidth={props.fullWidth}
			renderInput={(params) => (
				<TextField
					required={props.required}
					fullWidth={props.fullWidth}
					margin={props.margin}
					autoComplete={props.autoComplete}
					autoFocus={props.autoFocus}
					placeholder={props.placeholder}
					color={props.color as any}
					{...params}
					inputProps={{
						...params.inputProps,
						autoComplete: "new-password"
					}}
					label={props.label}
					aria-label={props.label}
					error={props.error !== undefined}
					helperText={props.error}
				/>
			)}
		/>
	);
}
