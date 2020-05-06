/* eslint-disable no-unused-vars */
import { useContext } from "react";

import NotificationContext, {
	INotificationContext
} from "./NotificationContext";

const useNotificationContext = (): INotificationContext => {
	return useContext(NotificationContext);
};

export default useNotificationContext;
