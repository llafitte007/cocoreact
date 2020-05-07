/* eslint-disable no-unused-vars */
import { FieldOptionsBuilder } from "../Field";
import ITableField from "./ITableField";
import TableFieldOptions from "./TableFieldOptions";

export default class TableFieldOptionsBuilder<
	T,
	TTableField extends ITableField<T> = ITableField<T>
> extends FieldOptionsBuilder<TTableField> {
	build() {
		const fields = this.buildFields();
		return new TableFieldOptions<T, TTableField>(fields);
	}
}
