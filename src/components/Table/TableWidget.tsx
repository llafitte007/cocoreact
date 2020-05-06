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

export interface TableWidgetConfiguration {
	widgetOptions: TypeWidgetOptions;
}

export interface TableWidgetProps {
	field: ITableField;
	data: any;
}

export default function TableWidget(
	props: TableWidgetProps & TableWidgetConfiguration
) {
	const { field, widgetOptions } = props;

	const fieldData = useTableFieldValue(field.name, props.data);

	if (field.render !== undefined) {
		return field.render({
			fieldProps: field,
			data: props.data
		});
	}

	const Component = widgetOptions.getComponent(field.type);

	return <Component {...field} data={fieldData} />;
}
