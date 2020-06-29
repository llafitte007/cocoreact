/* eslint-disable no-unused-vars */
import { useState, useCallback, useRef, useEffect } from "react";

import { IRequest } from "./IRequest";
import { IHttpClient } from "../HttpClient";

export default function useRequest<TRequest extends IRequest>(
	request: TRequest,
	initialValue: any,
	httpClient: IHttpClient
): [boolean, any] {
	const [state, setState] = useState({
		loading: true,
		data: initialValue,
		error: null as Error | null
	});

	const _isMounted = useRef(true);
	useEffect(() => {
		return () => {
			_isMounted.current = false;
		};
	}, []);

	const _updateData = useCallback(async () => {
		try {
			setState((s) => ({ ...s, loading: true }));

			const data = await httpClient.sendRequest<TRequest>(request);
			if (_isMounted.current) {
				setState({ data, loading: false, error: null });
			}
		} catch (e) {
			setState((s) => ({ ...s, loading: false, error: e }));
		}
	}, [request, httpClient]);

	useEffect(() => {
		_updateData();
	}, [_updateData]);

	if (state.error !== null) {
		throw state.error;
	}

	return [state.loading, state.data];
}
