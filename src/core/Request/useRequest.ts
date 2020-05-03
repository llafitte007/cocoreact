/* eslint-disable no-unused-vars */
import { useState, useCallback, useRef, useEffect } from "react";

import IRequest from "./IRequest";
import { IHttpClient } from "../HttpClient";

export default function useRequest<TRequest extends IRequest>(
	request: TRequest,
	initialValue: any,
	httpClient: IHttpClient
): [boolean, any, () => void, Error | null] {
	const [_state, _setState] = useState({
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
			_setState((s) => {
				return { ...s, loading: true };
			});

			const data = await httpClient.sendRequest<TRequest>(request);
			if (_isMounted.current) {
				_setState({ data, loading: false, error: null });
			}
		} catch (e) {
			_setState((s) => {
				return { ...s, loading: false, error: e };
			});
		}
	}, [request, httpClient]);

	useEffect(() => {
		_updateData();
	}, [_updateData]);

	const updateData = useCallback(() => {
		_updateData();
	}, [_updateData]);

	return [_state.loading, _state.data, updateData, _state.error];
}
