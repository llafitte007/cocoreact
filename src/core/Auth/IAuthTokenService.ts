/* eslint-disable no-unused-vars */
import { IRequest } from "../Request";

export default interface IAuthTokenService {
	responseErrorCode: number;
	getToken(): string;
	setToken(token: string): void;
	buildRefreshRequest(failedRequest: IRequest): IRequest;
	getNewTokenFromResponse(response: any): string;
}
