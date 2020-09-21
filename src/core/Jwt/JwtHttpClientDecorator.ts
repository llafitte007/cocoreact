/* eslint-disable no-unused-vars */
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { AxiosHttpClient, IHttpClient } from "../HttpClient";
import { IRequest } from "../Request";
import { IRefreshJwtService } from "./IRefreshJwtService";

export default class JwtHttpClientDecorator implements IHttpClient {
	_decorator: AxiosHttpClient;
	_jwtService: IRefreshJwtService;

	constructor(decorator: AxiosHttpClient, jwtService: IRefreshJwtService) {
		this._decorator = decorator;
		this._jwtService = jwtService;
	}

	protected _updateAuthorizationHeader(configuration: AxiosRequestConfig) {
		configuration.headers = {
			...configuration.headers,
			Authorization: "Bearer " + this._jwtService.getToken()
		};
	}

	buildConfiguration<TResquest extends IRequest>(request: TResquest) {
		const config = this._decorator.buildConfiguration(request);
		if (request.needAuthentication === true) {
			this._updateAuthorizationHeader(config);
		}
		return config;
	}

	async fetchRequest<T = any>(
		configuration: AxiosRequestConfig
	): Promise<AxiosResponse<T>> {
		try {
			return await this._decorator.fetchRequest<T>(configuration);
		} catch (e) {
			if (
				e.response &&
				configuration.headers.Authorization &&
				e.response.status === this._jwtService.responseErrorCode
			) {
				// try refresh access token (1 - build, 2 - process, 3 - get back new token)
				const refreshRequest = this._jwtService.buildRefreshRequest(
					configuration
				);
				const response = await this._decorator.sendRequest(
					refreshRequest
				);
				const token = this._jwtService.getNewTokenFromResponse(
					response
				);
				this._jwtService.setToken(token);

				// reply request
				this._updateAuthorizationHeader(configuration);
				return await this._decorator.fetchRequest<T>(configuration);
			}
			throw e;
		}
	}

	async sendRequest<TRequest extends IRequest>(
		request: TRequest
	): Promise<string> {
		const config = this.buildConfiguration(request);
		const response = await this.fetchRequest<string>(config);
		return response.data;
	}
}
