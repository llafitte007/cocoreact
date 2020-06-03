/* eslint-disable no-unused-vars */
import { useState, useCallback, useEffect, useRef } from "react";
import { IODataMessage } from "./IODataMessage";
import { IODataResponse } from "./IODataResponse";
import { useRequest, IRequest } from "../Request";
import { ISerializer } from "../Serializer";
import { IHttpClient } from "../HttpClient";

export default function useODataMessage<TResponse>(
	message: IODataMessage,
	initialValue: IODataResponse<TResponse>,
	serializer: ISerializer,
	httpClient: IHttpClient
): [boolean, TResponse[], number, () => void] {
	const firstUpdate = useRef(true);

	const [request, setRequest] = useState(
		serializer.serializeMessage(message)
	);

	const [loading, data, updateData] = useRequest<IRequest>(
		request,
		initialValue,
		httpClient
	);

	const updateRequestAndData = useCallback(() => {
		setRequest(serializer.serializeMessage(message));
	}, [message, serializer]);

	useEffect(() => {
		if (!firstUpdate.current) {
			updateData();
		} else {
			firstUpdate.current = false;
		}
	}, [updateData, request]);

	const response = serializer.deserialize<IODataResponse<TResponse>>(data);

	return [
		loading,
		response.d.results,
		parseInt(response.d.__count),
		updateRequestAndData
	];
}
