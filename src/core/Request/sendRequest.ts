/* eslint-disable no-unused-vars */
import IRequest from "./IRequest";
import { IHttpClient } from "../HttpClient";

export default function sendRequest<TRequest extends IRequest>(
	request: TRequest,
	httpClient: IHttpClient
): Promise<any> {
	return httpClient.sendRequest<TRequest>(request);
}
