/* eslint-disable no-unused-vars */
import { IRequest } from "../Request";

export default interface IJwtService {
	responseErrorCode: number;
	getToken(): string;
	setToken(token: string): void;
	buildRefreshRequest(failedRequest: IRequest): IRequest;
	getNewTokenFromResponse(response: any): string;
}
