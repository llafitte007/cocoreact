/* eslint-disable no-unused-vars */
import { useCallback, useState } from "react";
import { IMessage } from "./IMessage";
import { useRequest, IRequest } from "../Request";
import { ISerializer } from "../Serializer";
import { IHttpClient } from "../HttpClient";

export default function useMessage<TResponse>(
	message: IMessage,
	initialValue: TResponse,
	serializer: ISerializer,
	httpClient: IHttpClient
): [boolean, TResponse, () => void] {
	const [request, setRequest] = useState(
		serializer.serializeMessage(message)
	);

	const updateData = useCallback(() => {
		setRequest(serializer.serializeMessage(message));
	}, [message, serializer]);

	const [loading, data] = useRequest<IRequest>(
		request,
		initialValue,
		httpClient
	);

	return [loading, serializer.deserialize<TResponse>(data), updateData];
}
