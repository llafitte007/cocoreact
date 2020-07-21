/* eslint-disable no-unused-vars */
import React, { useMemo } from "react";

import { ITableField } from "../../core/TableField";
import { TypeWidgetOptions } from "../../core/TypeWidget";

function useTableFieldValue(fieldName: string, data: any) {
	return useMemo(
		() => fieldName ? data[fieldName] : data,
		[fieldName, data]
	);
}

export interface TableWidgetProps<T> {
	field: ITableField<T>;
	data: any;
	widgetOptions: TypeWidgetOptions;
}

export default function TableWidget<T>({
	field,
	data,
	widgetOptions
}: TableWidgetProps<T>) {
	const fieldValue = useTableFieldValue(field.name, data);

	if (field.render !== undefined) {
		return field.render({
			fieldProps: field,
			data: data
		});
	}

	const Component = widgetOptions.get(field.type);

	return <Component {...field} value={fieldValue} />;
}
