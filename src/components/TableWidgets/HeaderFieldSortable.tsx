/* eslint-disable no-unused-vars */
import React, { useCallback } from "react";
import { TableSortLabel } from "@material-ui/core";

import HeaderField, { HeaderFieldProps } from "./HeaderField";
import { OrderDirection } from "../../core";

export interface HeaderFieldSortableProps {
	field: HeaderFieldProps;
	active: boolean;
	direction?: OrderDirection;
	onClick: (name: string) => void;
}

export default function HeaderFieldSortable({
	field,
	active,
	direction,
	onClick
}: HeaderFieldSortableProps) {
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
			<HeaderField {...field} />
		</TableSortLabel>
	);
}
