/* eslint-disable no-unused-vars */
import { useMemo } from "react";
import IMessage from "./IMessage";
import { useRequest, IRequest } from "../Request";
import { ISerializer } from "../Serializer";
import { IHttpClient } from "../HttpClient";

export default function useMessage<TResponse>(
	message: IMessage,
	initialValue: TResponse,
	serializer: ISerializer,
	httpClient: IHttpClient
): [boolean, TResponse, () => void, Error | null] {
	const request = useMemo(() => {
		return serializer.serializeMessage(message);
	}, [message, serializer]);

	const [loading, data, updateData, error] = useRequest<IRequest>(
		request,
		initialValue,
		httpClient
	);

	return [
		loading,
		serializer.deserialize<TResponse>(data),
		updateData,
		error
	];
}
