/* eslint-disable no-unused-vars */
import React from "react";

import NotificationContext, {
	INotificationContext
} from "./NotificationContext";

const useNotificationContext = (): INotificationContext => {
	return React.useContext(NotificationContext);
};

export default useNotificationContext;
