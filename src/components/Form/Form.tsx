/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback } from "react";
import clsx from "clsx";
import {
	Button,
	PropTypes,
	Theme,
	makeStyles,
	createStyles,
	SvgIconProps
} from "@material-ui/core";

import { IMessage } from "../../core/Message";
import { IFormField } from "../../core/FormField";
import { IFormError, IFormErrorService } from "../../core/FormError";
import { TypeWidgetOptions } from "../../core/TypeWidget";
import FormWidget from "./FormWidget";
import { StyledComponent, CircularProgress } from "../Theme";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		form: {},
		errorContainer: {
			display: "flex",
			justifyContent: "center"
		},
		errorLabel: {
			textAlign: "center",
			padding: theme.spacing(0.5, 2),
			backgroundColor: theme.palette.primary.main,
			color: theme.palette.getContrastText(theme.palette.primary.main),
			borderRadius: theme.shape.borderRadius
		},
		submit: {
			marginTop: theme.spacing(1) * 2,
			marginLeft: "auto"
		}
	} as FormStyles)
);

export interface FormStyles {
	form: any;
	errorContainer: any;
	errorLabel: any;
	submit: any;
}

export interface FormSubmitProps {
	hidden?: boolean;
	label?: string;
	icon?: React.ReactElement<SvgIconProps>;
	ref?: React.RefObject<HTMLButtonElement>;
	classname?: string;
	color?: PropTypes.Color;
	variant?: "text" | "outlined" | "contained";
}

export interface FormProps<TInput, TResponse>
	extends StyledComponent<FormStyles> {
	initial: TInput;
	fields: IFormField<TInput>[];
	buildMessage: (model: TInput) => IMessage;
	sendMessage: (message: IMessage) => Promise<TResponse>;
	widgetOptions: TypeWidgetOptions;
	errorService: IFormErrorService;
	onSuccess?: (response: TResponse) => void;
	onError?: (error: any) => void;
	submit?: FormSubmitProps;
}

export default function Form<TInput, TResponse>({
	initial,
	fields,
	buildMessage,
	sendMessage,
	widgetOptions,
	errorService,
	onSuccess,
	onError,
	submit,

	className,
	classes,
	style
}: FormProps<TInput, TResponse>) {
	const styles = useStyles() as FormStyles;

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [fieldsErrors, setFieldsErrors] = useState<IFormError[]>([]);
	const [data, setData] = useState<any>(initial);

	useEffect(() => {
		setError(null);
		setFieldsErrors([]);
		setLoading(false);
		setData(initial);
	}, [initial, setData]);

	const handleChange = useCallback(
		(fieldName: string, value: any) => {
			setData((d: any) => {
				const dd = { ...d, [fieldName]: value };
				const field = fields.find((f) => f.name === fieldName);
				return field && field.onChange ? field.onChange(dd) : dd;
			});
		},
		[fields]
	);

	const handleSubmit = useCallback(
		async (e: React.FormEvent<HTMLFormElement>) => {
			e.preventDefault();
			e.stopPropagation();

			setLoading(true);
			setError(null);
			setFieldsErrors([]);

			try {
				const message = buildMessage(data);
				const response = await sendMessage(message);
				setLoading(false);
				onSuccess && onSuccess(response);
			} catch (err) {
				setLoading(false);

				onError && onError(err);

				if (err && errorService.isValid(err.response)) {
					const error = errorService.parse(err.response);

					if (Array.isArray(error)) {
						setFieldsErrors(error);
					} else if (error !== undefined) {
						setError(error);
					} else {
						console.error("undefined error : ", err.response);
					}
				} else {
					throw err;
				}
			}
		},
		[data, buildMessage, onError, onSuccess, sendMessage]
	);

	return (
		<form
			onSubmit={handleSubmit}
			className={clsx(styles.form, classes?.form, className)}
			style={style}
		>
			{error && (
				<div
					className={clsx(
						styles.errorContainer,
						classes?.errorContainer
					)}
				>
					<p className={clsx(styles.errorLabel, classes?.errorLabel)}>
						{error}
					</p>
				</div>
			)}

			{fields.map((field, idx) => (
				<FormWidget<TInput>
					key={idx}
					field={field}
					data={data}
					errors={fieldsErrors}
					onChange={handleChange}
					widgetOptions={widgetOptions}
				/>
			))}

			<div
				style={{
					display: submit?.hidden === false ? "none" : "flex",
					flexDirection: "row"
				}}
			>
				<Button
					type="submit"
					color={submit?.color ?? "secondary"}
					variant={submit?.variant ?? "contained"}
					disabled={loading}
					ref={submit?.ref}
					className={clsx(
						styles.submit,
						classes?.submit,
						submit?.classname
					)}
					endIcon={
						loading && submit?.icon ? (
							<CircularProgress size={18} />
						) : !loading && submit?.icon ? (
							submit.icon
						) : undefined
					}
				>
					{submit?.label ?? "Save"}
				</Button>
			</div>
		</form>
	);
}
