/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback } from "react";
import clsx from "clsx";
import { Theme, makeStyles, createStyles } from "@material-ui/core";

import { IMessage } from "../../core/Message";
import { IFormField } from "../../core/FormField";
import { IFormError, IFormErrorService } from "../../core/FormError";
import { TypeWidgetOptions } from "../../core/TypeWidget";
import FormWidget from "./FormWidget";
import { StyledComponent } from "../Theme";

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
		}
	} as FormStyles)
);

export interface FormStyles {
	form: any;
	errorContainer: any;
	errorLabel: any;
}

export interface FormChildrenRenderProps<TInput> {
	loading: boolean;
	data: TInput;
	setData: React.Dispatch<TInput>;
	errors: string[];
	fieldsErrors: IFormError[];
	updateValue: (fieldname: string, value: any) => void;
}

export type MessageBuilder<TInput> =
	| ((model: TInput) => Promise<IMessage>)
	| ((model: TInput) => IMessage);

export interface FormProps<TInput, TResponse>
	extends StyledComponent<FormStyles> {
	initial: TInput;
	fields: IFormField<TInput>[];
	buildMessage: MessageBuilder<TInput>;
	sendMessage: (message: IMessage) => Promise<TResponse>;
	widgetOptions: TypeWidgetOptions;
	errorService: IFormErrorService;
	onSuccess?: (response: TResponse) => void;
	onError?: (error: any) => void;
	onComplete?: () => void;
	children?: (
		props: FormChildrenRenderProps<TInput>
	) => React.ReactNode | React.ReactNode[];
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
	onComplete,
	children,

	className,
	classes,
	style
}: FormProps<TInput, TResponse>) {
	const styles = useStyles() as FormStyles;

	const [loading, setLoading] = useState(false);
	const [errors, setErrors] = useState<string[]>([]);
	const [fieldsErrors, setFieldsErrors] = useState<IFormError[]>([]);
	const [data, setData] = useState<any>(initial);

	useEffect(() => {
		setErrors([]);
		setFieldsErrors([]);
		setLoading(false);
		setData(initial);
	}, [initial, setData]);

	const handleChange = useCallback(
		async (fieldName: string, value: any) => {
			let newData = { ...data, [fieldName]: value };
			const field = fields.find((f) => f.name === fieldName);
			if (field && field.onChange) {
				const tmp = field.onChange(newData);
				if (tmp instanceof Promise) {
					newData = await tmp;
				} else {
					newData = tmp;
				}
			}
			setData(newData);
		},
		[fields, data]
	);

	const childrenProps = React.useMemo(
		() =>
			({
				loading,
				data,
				setData,
				errors,
				fieldsErrors,
				updateValue: handleChange
			} as FormChildrenRenderProps<TInput>),
		[loading, data, errors, fieldsErrors, handleChange]
	);

	const handleSubmit = useCallback(
		async (e: React.FormEvent<HTMLFormElement>) => {
			e.preventDefault();
			e.stopPropagation();

			setLoading(true);
			setErrors([]);
			setFieldsErrors([]);

			try {
				const messageTmp = buildMessage(data);
				const message =
					messageTmp instanceof Promise
						? await messageTmp
						: messageTmp;
				const response = await sendMessage(message);
				setLoading(false);
				onSuccess && onSuccess(response);
			} catch (err) {
				setLoading(false);

				onError && onError(err);

				if (err && errorService.isValid(err.response)) {
					const error = errorService.parse(err.response);

					if (Array.isArray(error)) {
						const _errors = [] as string[];
						setFieldsErrors(error);
						for (const err of error) {
							if (!err.field) {
								_errors.push(err.message);
							}
						}
						setErrors(_errors);
					} else if (error !== undefined) {
						setErrors([error]);
					} else {
						console.error("undefined error : ", err.response);
					}
				} else {
					throw err;
				}
			}

			onComplete && onComplete();
		},
		[data, buildMessage, onError, onSuccess, sendMessage]
	);

	return (
		<form
			onSubmit={handleSubmit}
			className={clsx(styles.form, classes?.form, className)}
			style={style}
		>
			{errors && (
				<div
					className={clsx(
						styles.errorContainer,
						classes?.errorContainer
					)}
				>
					{errors.map((x) => (
						// eslint-disable-next-line react/jsx-key
						<p
							className={clsx(
								styles.errorLabel,
								classes?.errorLabel
							)}
						>
							{x}
						</p>
					))}
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

			{children && children(childrenProps)}
		</form>
	);
}
