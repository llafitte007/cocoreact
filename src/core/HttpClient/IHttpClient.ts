/* eslint-disable no-unused-vars */
import { IRequest } from "../Request";

export interface IHttpClient {
	sendRequest<TResquest extends IRequest>(request: TResquest): Promise<any>;
}
