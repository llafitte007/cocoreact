/* eslint-disable no-unused-vars */
import React from "react";

import { IFormField } from "../../core/FormField";
import { IFormError } from "../../core/FormError";
import { TypeWidgetOptions } from "../../core/TypeWidget";
import { useFormFieldError, useFormFieldValue } from "./hooks";

export interface FormWidgetConfiguration {
	widgetOptions: TypeWidgetOptions;
}

export interface FormWidgetProps {
	field: IFormField;
	data: any;
	errors: IFormError[];
	onChange: (fieldName: string, value: any) => void;
}

export default function FormWidget(
	props: FormWidgetProps & FormWidgetConfiguration
) {
	const { field, onChange, widgetOptions } = props;

	const fieldData = useFormFieldValue(field.name, props.data);
	const fieldError = useFormFieldError(field.name, props.errors);

	if (field.render !== undefined) {
		return field.render({
			fieldProps: field,
			data: props.data,
			errors: props.errors
		});
	}

	const Component = widgetOptions.getComponent(field.type);

	return (
		<Component
			{...field}
			onChange={onChange}
			data={fieldData}
			error={fieldError}
		/>
	);
}
