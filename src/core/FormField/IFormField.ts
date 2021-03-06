/* eslint-disable no-unused-vars */
import { IFormError } from "../FormError";
import { IField } from "../IField";

export interface IFormFieldBase extends IField {
	label?: string;
	placeholder?: string;
	disabled?: boolean;
	required?: boolean;
	autoFocus?: boolean;
	autoComplete?: string;
	className?: string;
}

export interface IFormField<T> extends IFormFieldBase {
	render?: (fieldProps: IFormFieldRenderer<T>) => JSX.Element;
	onChange?: ((d: T) => T) | ((d: T) => Promise<T>);
}

export interface IFormFieldRenderer<T> {
	fieldProps: IFormField<T>;
	value: T;
	errors: IFormError[];
}
