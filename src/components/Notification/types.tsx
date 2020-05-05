export type VerticalPosition = "top" | "bottom";
export type HorizontalPosition = "left" | "center" | "right";

export type NotificationType = "info" | "success" | "warning" | "error";

export interface INotificationProps {
	open: boolean;
	type: NotificationType;
	message: string;
	onClose: () => void;
	autoHideDuration?: number;
	position?: {
		vertical?: VerticalPosition;
		horizontal?: HorizontalPosition;
	};
}
