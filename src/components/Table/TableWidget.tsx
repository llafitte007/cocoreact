/* eslint-disable no-unused-vars */
import React, { useMemo } from "react";

import { ITableField } from "../../core/TableField";
import { TypeWidgetOptions } from "../../core/TypeWidget";

function useTableFieldValue<T>(fieldName: string, data: any): T {
	return useMemo(() => {
		if (fieldName === "") return data;
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

export interface TableWidgetProps {
	field: ITableField;
	data: any;
	widgetOptions: TypeWidgetOptions;
}

export default function TableWidget({
	field,
	data,
	widgetOptions
}: TableWidgetProps) {
	const fieldData = useTableFieldValue(field.name, data);

	if (field.render !== undefined) {
		return field.render({
			fieldProps: field,
			data: data
		});
	}

	const Component = widgetOptions.get(field.type);

	return <Component {...field} data={fieldData} />;
}
