/* eslint-disable no-unused-vars */
import { IRequest } from "../Request";

export interface IHttpClient {
	buildConfiguration<TResquest extends IRequest>(request: TResquest): any;
	fetchRequest(configuration: any): Promise<any>;
	sendRequest<TResquest extends IRequest>(request: TResquest): Promise<any>;
}
