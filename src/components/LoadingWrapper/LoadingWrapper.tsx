/* eslint-disable no-unused-vars */
import React from "react";
import clsx from "clsx";
import {
	Theme,
	makeStyles,
	createStyles,
	CircularProgress
} from "@material-ui/core";

import { ClassesStyledComponent } from "../Theme";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		container: {
			position: "relative",
			padding: 0,
			margin: 0
		},
		loader: {
			position: "absolute",
			width: "100%",
			height: "100%",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			backgroundColor: theme.palette.background.paper,
			opacity: 0.8,
			zIndex: theme.zIndex.appBar - 1
		}
	} as LoadingWrapperStyles)
);

export interface LoadingWrapperStyles {
	container: any;
	loader: any;
}

export interface LoadingWrapperProps
	extends ClassesStyledComponent<LoadingWrapperStyles> {
	loading: boolean;
	loaderSize?: number;
	children: React.ReactNode | React.ReactNode[];
	className?: string;
}

export default function LoadingWrapper({
	loading,
	loaderSize,
	children,
	classes,
	className
}: LoadingWrapperProps) {
	const styles = useStyles() as LoadingWrapperStyles;

	return (
		<div className={clsx(styles.container, className, classes?.container)}>
			{loading ? (
				<div className={clsx(styles.loader, classes?.loader)}>
					<CircularProgress size={loaderSize ?? 28} />
				</div>
			) : null}
			{children}
		</div>
	);
}
