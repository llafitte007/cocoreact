import { createContext } from "react";

export interface IAuthContext<TPayload = any> {
	mounted: boolean;
	logged: boolean;
	payload: TPayload | null;
	setToken: (token: string | null) => void;
}

const AuthContext = createContext<IAuthContext>({
	mounted: false,
	logged: false,
	payload: null,
	setToken: () => {
		throw new Error(`undefined IAuthContext.setToken() method`);
	}
});

export default AuthContext;
