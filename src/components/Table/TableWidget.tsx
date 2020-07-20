/* eslint-disable no-unused-vars */
import React, { useMemo } from "react";

import { ITableField } from "../../core/TableField";
import { TypeWidgetOptions } from "../../core/TypeWidget";

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
	const fieldData = useMemo(
		() => field.name ? data[field.name] : data,
		[field.name, data]
	);

	if (field.render !== undefined) {
		return field.render({
			fieldProps: field,
			data: data
		});
	}

	const Component = widgetOptions.get(field.type);

	return <Component {...field} data={fieldData} />;
}
