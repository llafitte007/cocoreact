/* eslint-disable no-unused-vars */
import React, { useMemo } from "react";

import { IFormField } from "../../core/FormField";
import { IFormError } from "../../core/FormError";
import { TypeWidgetOptions } from "../../core/TypeWidget";

function useFormFieldValue(fieldName: string, data: any) {
	return useMemo(
		() => fieldName ? data[fieldName] : data,
		[fieldName, data]
	);
}

function useFormFieldError(
	name: string,
	errors?: IFormError[]
): string | undefined {
	return useMemo(() => {
		if (errors === undefined) return undefined;
		const error = errors.find((x) => x.fieldName === name);
		return error === undefined ? undefined : error.message;
	}, [name, errors]);
}

export interface FormWidgetProps<T> {
	field: IFormField<T>;
	data: any;
	errors: IFormError[];
	onChange: (fieldName: string, value: any) => void;
	widgetOptions: TypeWidgetOptions;
}

export default function FormWidget<T>(props: FormWidgetProps<T>) {
	const { field, onChange, widgetOptions } = props;

	const fieldValue = useFormFieldValue(field.name, props.data);
	const fieldError = useFormFieldError(field.name, props.errors);

	if (field.render !== undefined) {
		return field.render({
			fieldProps: field,
			value: props.data,
			errors: props.errors
		});
	}

	const Component = widgetOptions.get(field.type);

	return (
		<Component
			{...field}
			onChange={onChange}
			value={fieldValue}
			error={fieldError}
		/>
	);
}
