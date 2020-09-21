/* eslint-disable no-unused-vars */
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { IHttpClient } from "./IHttpClient";
import { IRequest } from "../Request";

export default class AxiosHttpClient implements IHttpClient {
	_baseUrl: string;

	constructor(baseUrl: string) {
		this._baseUrl = baseUrl;
	}

	async sendRequest(request: IRequest): Promise<string> {
		const config = this.buildConfiguration(request);
		const response = await this.fetchRequest<string>(config);
		return response.data;
	}

	fetchRequest<T = any>(
		configuration: AxiosRequestConfig
	): Promise<AxiosResponse<T>> {
		return axios.request<T>(configuration);
	}

	buildConfiguration(request: IRequest): AxiosRequestConfig {
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
