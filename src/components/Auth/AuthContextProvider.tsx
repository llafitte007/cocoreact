/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback, useMemo } from "react";

import AuthContext from "./AuthContext";

export interface IAuthService<TPayload = any> {
	getToken: (() => string | null) | (() => Promise<string | null>);
	setToken: (token: string | null) => void;
	getPayload(token: string): TPayload;
}

export interface AuthContextProviderProps<TPayload = any> {
	children?: React.ReactNode | React.ReactNode[];
	authService: IAuthService<TPayload>;
}

export default function AuthContextProvider<TPayload = any>({
	children,
	authService
}: AuthContextProviderProps<TPayload>) {
	const [mounted, setMounted] = useState(false);
	const [logged, setLogged] = useState(false);
	const [token, setToken] = useState<string | null>(null);
	const [payload, setPayload] = useState<TPayload | null>(null);

	useEffect(() => {
		const _getToken = async () => {
			const res = authService.getToken();
			const _token = res instanceof Promise ? await res : res;
			setToken(_token);
			setMounted(true);
		};
		_getToken();
	}, []);

	useEffect(() => {
		// todo : test is token is valid ?
		if (token !== null && token.length > 0) {
			setPayload(authService.getPayload(token));
			setLogged(true);
		} else {
			setPayload(null);
			setLogged(false);
		}
	}, [token, setPayload, setLogged]);

	const setNewToken = useCallback(
		(token: string | null) => {
			authService.setToken(token);
			setToken(token);
		},
		[authService]
	);

	const value = useMemo(
		() => ({ mounted, logged, payload, setToken: setNewToken }),
		[mounted, logged, payload, setNewToken]
	);

	return (
		<AuthContext.Provider value={value}>{children}</AuthContext.Provider>
	);
}
