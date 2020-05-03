/* eslint-disable no-unused-vars */
import { IFormError } from "../FormError";

export interface IFormFieldBase {
	name: string;
	type: string;
	label?: string;
	placeholder?: string;
	disabled?: boolean;
	required?: boolean;
	autoFocus?: boolean;
	autoComplete?: string;
	className?: string;
}

export default interface IFormField<T = any> extends IFormFieldBase {
	render?: (fieldProps: IFormFieldRenderer<T>) => JSX.Element;
	onChange?: (d: T) => T;
}

export interface IFormFieldRenderer<T> {
	fieldProps: IFormField<T>;
	data: T;
	errors: IFormError[];
}
