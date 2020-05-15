/* eslint-disable no-unused-vars */
import { IODataMessage } from "./IODataMessage";
import { IODataResponse } from "./IODataResponse";
import { sendRequest, IRequest } from "../Request";
import { ISerializer } from "../Serializer";
import { IHttpClient } from "../HttpClient";

export default async function sendMessage<TResponse>(
	message: IODataMessage,
	serializer: ISerializer,
	httpClient: IHttpClient
): Promise<TResponse[]> {
	const request = serializer.serializeMessage(message);

	const data = await sendRequest<IRequest>(request, httpClient);

	const response = serializer.deserialize<IODataResponse<TResponse>>(data);

	return response.d.results;
}
