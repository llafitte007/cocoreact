/* eslint-disable no-unused-vars */
import axios, { AxiosRequestConfig } from "axios";
import { IHttpClient } from "./core/HttpClient";
import { IRequest } from "./core/Request";

export default class AxiosHttpClient implements IHttpClient {
	_baseUrl: string;

	constructor(baseUrl: string) {
		this._baseUrl = baseUrl;
	}

	async sendRequest(request: IRequest): Promise<string> {
		const axiosRequest = this._buildConfiguration(request);
		const response = await axios.request<string>(axiosRequest);
		return response.data;
	}

	protected _buildConfiguration(request: IRequest): AxiosRequestConfig {
		const requestUrl =
			request.path +
			(request.queryString !== undefined
				? `?${request.queryString}`
				: "");

		const configuration: AxiosRequestConfig = {
			baseURL: this._baseUrl,
			url: requestUrl,
			method: request.method,
			headers: request.headers ?? {},
			transformResponse: (res) => {
				return res;
			},
			withCredentials: true
		};

		if (request.body !== undefined) {
			configuration.data = request.body;
		}

		return configuration;
	}
}