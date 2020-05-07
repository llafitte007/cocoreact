/* eslint-disable no-unused-vars */
import { FieldOptions } from "../Field";
import ITableField from "./ITableField";

export default class TableFieldOptions<
	T,
	TFieldOptions extends ITableField<T>
> extends FieldOptions<TFieldOptions> {}
