/* eslint-disable no-unused-vars */
import { useMemo } from "react";
import { IODataMessage } from "./IODataMessage";
import { IODataResponse } from "./IODataResponse";
import { useRequest, IRequest } from "../Request";
import { ISerializer } from "../Serializer";
import { IHttpClient } from "../HttpClient";

export default function useMessage<TResponse>(
	message: IODataMessage,
	initialValue: IODataResponse<TResponse>,
	serializer: ISerializer,
	httpClient: IHttpClient
): [boolean, TResponse[], number, () => void, Error | null] {
	const request = useMemo(() => {
		return serializer.serializeMessage(message);
	}, [message, serializer]);

	const [loading, data, updateData, error] = useRequest<IRequest>(
		request,
		initialValue,
		httpClient
	);

	const response = serializer.deserialize<IODataResponse<TResponse>>(data);

	return [
		loading,
		response.d.results,
		parseInt(response.d.__count),
		updateData,
		error
	];
}
