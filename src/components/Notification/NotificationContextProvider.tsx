/* eslint-disable no-unused-vars */
import React, { useCallback, useState, useMemo } from "react";

import { NotificationType, INotificationProps } from "./types";
import NotificationContext from "./NotificationContext";
import Notification from "./Notification";

export interface NotificationContextProviderProps {
	autoHideDuration?: number;
	children: React.ReactNode | React.ReactNode[];
	component?: React.ComponentType<INotificationProps>;
}

export default function NotificationContextProvider({
	autoHideDuration,
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
				setState((_s) => ({ type, message }));
			}, 100);
		},
		[clear]
	);

	const info = useCallback(
		(message: string) => setNotification("info", message),
		[setNotification]
	);
	const success = useCallback(
		(message: string) => setNotification("success", message),
		[setNotification]
	);
	const warning = useCallback(
		(message: string) => setNotification("warning", message),
		[setNotification]
	);
	const error = useCallback(
		(message: string) => setNotification("error", message),
		[setNotification]
	);

	const value = useMemo(() => ({ info, success, warning, error, clear }), [
		info,
		success,
		warning,
		error,
		clear
	]);

	return (
		<NotificationContext.Provider value={value}>
			{children}
			{state && (
				<Component
					open
					onClose={clear}
					autoHideDuration={autoHideDuration ?? 3000}
					{...state}
				/>
			)}
		</NotificationContext.Provider>
	);
}
