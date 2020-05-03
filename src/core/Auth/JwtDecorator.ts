/* eslint-disable no-unused-vars */
import { IHttpClient } from "../HttpClient";
import { IRequest } from "../Request";
import IAuthTokenService from "./IAuthTokenService";

export default class JwtDecorator implements IHttpClient {
	_decorator: IHttpClient;
	_authTokenService: IAuthTokenService;

	constructor(decorator: IHttpClient, authTokenService: IAuthTokenService) {
		this._decorator = decorator;
		this._authTokenService = authTokenService;
	}

	async sendRequest<TRequest extends IRequest>(
		request: TRequest
	): Promise<any> {
		try {
			if (request.needAuthentication) {
				request.headers = {
					...request.headers,
					Authorization: "Bearer " + this._authTokenService.getToken()
				};
			}
			return this._decorator.sendRequest(request);
		} catch (e) {
			if (
				e.response &&
				request.needAuthentication &&
				e.response.status === this._authTokenService.responseErrorCode
			) {
				// try refresh access token (1 - build, 2 - process, 3 - get back new token)
				const refreshRequest = this._authTokenService.buildRefreshRequest(
					request
				);
				const response = await this._decorator.sendRequest(
					refreshRequest
				);
				const token = this._authTokenService.getNewTokenFromResponse(
					response
				);
				this._authTokenService.setToken(token);

				// reply request
				return this._decorator.sendRequest(request);
			}
			throw e;
		}
	}
}
