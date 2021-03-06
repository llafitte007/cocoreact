/* eslint-disable no-unused-vars */
import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core";
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

export interface HeaderTableWidgetProps extends ITableFieldBase {}

export default function HeaderTableWidget({
	icon,
	label
}: HeaderTableWidgetProps) {
	const styles = useStyles();

	if (!label) {
		return null;
	}

	return (
		<span className={styles.cell}>
			{icon && <span className={styles.icon}>{icon}</span>}
			<span className={styles.title}>{label}</span>
		</span>
	);
}
