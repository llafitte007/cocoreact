import React from "react";

export interface INotificationContext {
	info: (message: string) => void;
	success: (message: string) => void;
	warning: (message: string) => void;
	error: (message: string) => void;
	clear: () => void;
}

const NotificationContext = React.createContext<INotificationContext>({
	info: () => {
		throw new Error("undefined INotificationContext.info() method");
	},
	success: () => {
		throw new Error("undefined INotificationContext.success() method");
	},
	warning: () => {
		throw new Error("undefined INotificationContext.warning() method");
	},
	error: () => {
		throw new Error("undefined INotificationContext.error() method");
	},
	clear: () => {
		throw new Error("undefined INotificationContext.clear() method");
	}
});

export default NotificationContext;
