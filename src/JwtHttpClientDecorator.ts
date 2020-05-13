/* eslint-disable no-unused-vars */
import { IHttpClient } from "./core/HttpClient";
import { IRequest } from "./core/Request";

export interface IRefreshJwtService {
	responseErrorCode: number;
	getToken(): string;
	setToken(token: string): void;
	buildRefreshRequest(failedRequest: IRequest): IRequest;
	getNewTokenFromResponse(response: any): string;
}

export default class JwtHttpClientDecorator implements IHttpClient {
	_decorator: IHttpClient;
	_jwtService: IRefreshJwtService;

	constructor(decorator: IHttpClient, jwtService: IRefreshJwtService) {
		this._decorator = decorator;
		this._jwtService = jwtService;
	}

	async sendRequest<TRequest extends IRequest>(
		request: TRequest
	): Promise<any> {
		try {
			if (request.needAuthentication === true) {
				request.headers = {
					...request.headers,
					Authorization: "Bearer " + this._jwtService.getToken()
				};
			}
			return this._decorator.sendRequest(request);
		} catch (e) {
			if (
				e.response &&
				request.needAuthentication === true &&
				e.response.status === this._jwtService.responseErrorCode
			) {
				// try refresh access token (1 - build, 2 - process, 3 - get back new token)
				const refreshRequest = this._jwtService.buildRefreshRequest(
					request
				);
				const response = await this._decorator.sendRequest(
					refreshRequest
				);
				const token = this._jwtService.getNewTokenFromResponse(
					response
				);
				this._jwtService.setToken(token);

				// reply request
				return this._decorator.sendRequest(request);
			}
			throw e;
		}
	}
}
