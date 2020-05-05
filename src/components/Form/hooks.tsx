/* eslint-disable no-unused-vars */
import React from "react";
import { IFormError } from "../../core/FormError";

export function useFormFieldValue<T>(fieldName: string, data: any): T {
	return React.useMemo(() => {
		if (data[fieldName] === undefined) {
			throw new Error(
				`invalid fieldName '${fieldName}' in data : ${JSON.stringify(
					data
				)}`
			);
		}
		return data[fieldName] as T;
	}, [fieldName, data]);
}

export function useFormFieldError(
	name: string,
	errors?: IFormError[]
): string | undefined {
	return React.useMemo(() => {
		if (errors === undefined) return undefined;
		const error = errors.find((x) => x.fieldName === name);
		return error === undefined ? undefined : error.message;
	}, [name, errors]);
}
