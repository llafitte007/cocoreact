/* eslint-disable no-unused-vars */
import { RequestMethod } from "../Request";

export interface IMessage {
	getPath: () => string;
	getMethod: () => RequestMethod;
	getQueryString: () => Record<string, any> | undefined;
	getBody: () => Record<string, any> | undefined;
	needAuthentication: () => boolean;
}
