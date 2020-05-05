/* eslint-disable no-unused-vars */
import React from "react";
import clsx from "clsx";

import {
	Snackbar,
	IconButton,
	SnackbarContent,
	createStyles,
	makeStyles
} from "@material-ui/core";
import { lighten, Theme } from "@material-ui/core/styles";
import { amber, green } from "@material-ui/core/colors";
import {
	InfoIcon,
	SuccessIcon,
	WarningIcon,
	ErrorIcon,
	CloseIcon,
	StyledComponent
} from "../Theme";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		snackbar: {
			marginBottom: theme.spacing(2)
		},
		snackbarContent: {
			backgroundColor: lighten(theme.palette.background.paper, 0.2),
			color: theme.palette.text.primary
		},
		messageContainer: {
			display: "flex",
			alignItems: "center"
		},
		messageIcon: {
			fontSize: 20,
			opacity: 0.9,
			marginRight: theme.spacing(1)
		},
		closeIcon: {
			padding: theme.spacing(0.5)
		},
		success: {
			color: green[600]
		},
		error: {
			color: theme.palette.error.dark
		},
		info: {
			color: theme.palette.primary.main
		},
		warning: {
			color: amber[700]
		}
	} as NotificationStyles)
);

export interface NotificationStyles {
	snackbar: any;
	snackbarContent: any;
	messageContainer: any;
	messageIcon: any;
	closeIcon: any;
	success: any;
	info: any;
	warning: any;
	error: any;
}

export type NotificationType = "info" | "success" | "warning" | "error";

export interface NotificationProps extends StyledComponent<NotificationStyles> {
	open: boolean;
	type: NotificationType;
	message: string;
	onClose: () => void;
	autoHideDuration?: number;
}

function getIconFromType(type: NotificationType) {
	switch (type) {
		case "info":
			return InfoIcon;
		case "success":
			return SuccessIcon;
		case "warning":
			return WarningIcon;
		case "error":
			return ErrorIcon;
		default:
			return InfoIcon;
	}
}

export default function Notification({
	open,
	type,
	message,
	onClose,
	autoHideDuration,

	className,
	classes,
	style
}: NotificationProps) {
	const styles = useStyles() as NotificationStyles;
	const Icon = getIconFromType(type);

	return (
		<Snackbar
			open={open}
			onClose={onClose}
			autoHideDuration={autoHideDuration}
			anchorOrigin={{
				vertical: "bottom",
				horizontal: "left"
			}}
			className={clsx(styles.snackbar, classes?.snackbar, className)}
			style={style}
		>
			<SnackbarContent
				className={clsx(
					styles.snackbarContent,
					classes?.snackbarContent
				)}
				aria-describedby="notification-id"
				message={
					<span
						id="notification-id"
						className={clsx(
							styles.messageContainer,
							classes?.messageContainer
						)}
					>
						<Icon
							className={clsx(
								styles.messageIcon,
								styles[type],
								classes ? classes[type] : undefined
							)}
						/>
						{message}
					</span>
				}
				action={[
					<IconButton
						key="close"
						aria-label="close"
						color="inherit"
						onClick={onClose}
					>
						<CloseIcon
							className={clsx(
								styles.closeIcon,
								classes?.closeIcon
							)}
						/>
					</IconButton>
				]}
			/>
		</Snackbar>
	);
}
