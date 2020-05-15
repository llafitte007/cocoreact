/* eslint-disable no-unused-vars */
import React, { useState, useCallback } from "react";

import {
	IconButton,
	Menu,
	MenuItem,
	ListItemIcon,
	Theme,
	createStyles,
	makeStyles
} from "@material-ui/core";

import {
	ContainsIcon,
	EqualIcon,
	NotEqualIcon,
	LessThanIcon,
	LessThanOrEqualIcon,
	GreaterThanIcon,
	GreaterThanOrEqualIcon
} from "../Theme";
import { ODataFilterOperator } from "../../core";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		button: {
			cursor: "pointer",
			display: "flex",
			alignItems: "center"
		},
		item: {
			paddingLeft: theme.spacing(1),
			paddingRight: theme.spacing(1)
		},
		itemIcon: {
			minWidth: theme.spacing(3),
			maxWidth: theme.spacing(3)
		}
	} as HeaderFilterOperatorStyle)
);

export interface HeaderFilterOperatorStyle {
	button: any;
	item: any;
	itemIcon: any;
}

const OPERATORS_ICON = {
	contains: <ContainsIcon />,
	eq: <EqualIcon />,
	ne: <NotEqualIcon />,
	lt: <LessThanIcon />,
	le: <LessThanOrEqualIcon />,
	gt: <GreaterThanIcon />,
	ge: <GreaterThanOrEqualIcon />
};

export interface HeaderFilterOperatorProps {
	value: ODataFilterOperator;
	operators: ODataFilterOperator[];
	onChange: (newOperator: ODataFilterOperator) => void;
}

export default function HeaderFilterOperator({
	value,
	operators,
	onChange
}: HeaderFilterOperatorProps) {
	const styles = useStyles() as HeaderFilterOperatorStyle;

	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const menuOpenHandle = useCallback(
		(event: React.MouseEvent<HTMLElement>) => {
			event.preventDefault();
			event.stopPropagation();
			setAnchorEl(event.currentTarget);
		},
		[]
	);
	const menuCloseHandle = useCallback(() => setAnchorEl(null), []);

	return (
		<>
			<IconButton
				size="small"
				aria-controls="filter-operator"
				className={styles.button}
				onClick={menuOpenHandle}
			>
				{OPERATORS_ICON[value]}
			</IconButton>

			<Menu
				elevation={0}
				getContentAnchorEl={null}
				anchorOrigin={{
					vertical: "top",
					horizontal: "center"
				}}
				transformOrigin={{
					vertical: "top",
					horizontal: "center"
				}}
				open={Boolean(anchorEl)}
				anchorEl={anchorEl}
				keepMounted
				onClose={menuCloseHandle}
			>
				{operators.map((op, idx) => {
					return (
						<MenuItem
							key={idx}
							selected={value === op}
							className={styles.item}
							onClick={() => onChange(op)}
						>
							<ListItemIcon className={styles.itemIcon}>
								{OPERATORS_ICON[op]}
							</ListItemIcon>
						</MenuItem>
					);
				})}
			</Menu>
		</>
	);
}
