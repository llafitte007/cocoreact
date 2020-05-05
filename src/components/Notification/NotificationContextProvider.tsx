/* eslint-disable no-unused-vars */
import React, { useCallback, useState, useMemo } from "react";

import { NotificationType, INotificationProps } from "./types";
import NotificationContext from "./NotificationContext";
import Notification from "./Notification";

export interface NotificationContextProviderProps {
	children: React.ReactNode | React.ReactNode[];
	component?:
		| React.Component<INotificationProps>
		| React.FC<INotificationProps>
		| ((props: INotificationProps) => JSX.Element);
}

export default function NotificationContextProvider({
	children,
	component
}: NotificationContextProviderProps) {
	const Component = useMemo(() => {
		return (component ?? Notification) as any;
	}, []);

	const [state, setState] = useState<{
		message: string;
		type: NotificationType;
	} | null>(null);

	const clear = useCallback(() => {
		setState((_s) => null);
	}, []);

	const setNotification = useCallback(
		(type: NotificationType, message: string) => {
			clear();
			// use timeout to waiting refresh render after clear
			setTimeout(() => {
				setState((_s) => {
					return { type, message };
				});
			}, 100);
		},
		[clear]
	);

	const info = useCallback(
		(message: string) => {
			setNotification("info", message);
		},
		[setNotification]
	);

	const success = React.useCallback(
		(message: string) => {
			setNotification("success", message);
		},
		[setNotification]
	);

	const warning = React.useCallback(
		(message: string) => {
			setNotification("warning", message);
		},
		[setNotification]
	);

	const error = React.useCallback(
		(message: string) => {
			setNotification("error", message);
		},
		[setNotification]
	);

	return (
		<NotificationContext.Provider
			value={{ info, success, warning, error, clear }}
		>
			{children}
			{state && (
				<Component
					open
					onClose={clear}
					autoHideDuration={3000}
					{...state}
				/>
			)}
		</NotificationContext.Provider>
	);
}
