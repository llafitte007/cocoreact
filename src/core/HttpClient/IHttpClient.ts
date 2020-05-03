/* eslint-disable no-unused-vars */
import { IRequest } from "../Request";

export default interface IHttpClient {
	sendRequest<TResquest extends IRequest>(request: TResquest): Promise<any>;
}
