/* eslint-disable no-unused-vars */
import { useContext } from "react";

import AuthContext, { IAuthContext } from "./AuthContext";

export default function useAuthContext<TPayload>(): IAuthContext<TPayload> {
	return useContext(AuthContext);
}
