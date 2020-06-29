/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback, useMemo } from "react";

import AuthContext from "./AuthContext";

export interface IAuthService {
	getToken: () => string | null;
	setToken: (token: string | null) => void;
	getPayload<T>(token: string): T;
}

export interface AuthContextProviderProps {
	children?: React.ReactNode;
	authService: IAuthService;
}

export default function AuthContextProvider<TPayload>({
	children,
	authService
}: AuthContextProviderProps) {
	const [mounted, setMounted] = useState(false);
	const [logged, setLogged] = useState(false);
	const [token, setToken] = useState<string | null>(null);
	const [payload, setPayload] = useState<TPayload | null>(null);

	useEffect(() => {
		const _token = authService.getToken();
		setToken(_token);
		setMounted(true);
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
