/* eslint-disable no-unused-vars */
import { IMessage } from "./IMessage";
import { sendRequest, IRequest } from "../Request";
import { ISerializer } from "../Serializer";
import { IHttpClient } from "../HttpClient";

export default async function sendMessage<TResponse>(
	message: IMessage,
	serializer: ISerializer,
	httpClient: IHttpClient
): Promise<TResponse> {
	const request = serializer.serializeMessage(message);

	const data = await sendRequest<IRequest>(request, httpClient);

	return serializer.deserialize<TResponse>(data);
}
