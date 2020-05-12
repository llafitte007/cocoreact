/* eslint-disable no-unused-vars */
import { useContext } from "react";

import NotificationContext, {
	INotificationContext
} from "./NotificationContext";

export default function useNotificationContext(): INotificationContext {
	return useContext(NotificationContext);
}
