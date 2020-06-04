/* eslint-disable no-unused-vars */
import { IODataMessage } from "./IODataMessage";
import { IODataResponse } from "./IODataResponse";
import { ISerializer } from "../Serializer";
import { IHttpClient } from "../HttpClient";
import { useMessage } from "../Message";

export default function useODataMessage<TResponse>(
	message: IODataMessage,
	initialValue: IODataResponse<TResponse>,
	serializer: ISerializer,
	httpClient: IHttpClient
): [boolean, TResponse[], number, () => void] {
	const [loading, data, updateData] = useMessage<IODataResponse<TResponse>>(
		message,
		initialValue,
		serializer,
		httpClient
	);

	return [loading, data.d.results, parseInt(data.d.__count), updateData];
}
