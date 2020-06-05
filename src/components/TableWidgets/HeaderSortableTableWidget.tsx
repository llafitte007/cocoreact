/* eslint-disable no-unused-vars */
import React, { useCallback } from "react";
import { TableSortLabel } from "@material-ui/core";

import HeaderTableWidget, { HeaderTableWidgetProps } from "./HeaderTableWidget";
import { OrderDirection } from "../../core";

export interface HeaderSortableTableWidgetProps {
	field: HeaderTableWidgetProps;
	active: boolean;
	direction?: OrderDirection;
	onClick: (name: string) => void;
}

export default function HeaderSortableTableWidget({
	field,
	active,
	direction,
	onClick
}: HeaderSortableTableWidgetProps) {
	const clickHandle = useCallback(() => onClick(field.name), [
		onClick,
		field.name
	]);

	return (
		<TableSortLabel
			active={active}
			direction={direction}
			onClick={clickHandle}
		>
			<HeaderTableWidget {...field} />
		</TableSortLabel>
	);
}
