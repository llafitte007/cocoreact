/* eslint-disable no-unused-vars */
import React from "react";
import { TableCell, makeStyles, createStyles, Theme } from "@material-ui/core";
import { ITableFieldBase } from "../../core/TableField";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		cell: {
			flexDirection: "row",
			alignContent: "center",
			verticalAlign: "middle"
		},
		icon: {
			marginRight: theme.spacing(1),
			"& svg": {
				verticalAlign: "middle"
			}
		},
		title: {
			whiteSpace: "nowrap"
		}
	})
);

export interface TableHeaderProps extends ITableFieldBase {}

export default function TableHeader({
	align,
	padding,
	icon,
	label
}: TableHeaderProps) {
	const styles = useStyles();

	return (
		<TableCell align={align} padding={padding ?? "default"}>
			<span className={styles.cell}>
				{icon && <span className={styles.icon}>{icon}</span>}
				<span className={styles.title}>{label || null}</span>
			</span>
		</TableCell>
	);
}
