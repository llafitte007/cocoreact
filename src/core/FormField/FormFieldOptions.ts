/* eslint-disable no-unused-vars */
import { FieldOptions } from "../Field";
import IFormField from "./IFormField";

export default class FormFieldOptions<
	T,
	TFieldOptions extends IFormField<T>
> extends FieldOptions<TFieldOptions> {}
