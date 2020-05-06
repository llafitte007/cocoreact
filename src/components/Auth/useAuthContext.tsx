/* eslint-disable no-unused-vars */
import { useContext } from "react";

import AuthContext, { IAuthContext } from "./AuthContext";

const useAuthContext = (): IAuthContext => {
	return useContext(AuthContext);
};

export default useAuthContext;
