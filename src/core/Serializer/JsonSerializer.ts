/* eslint-disable no-unused-vars */
import ISerializer from "./ISerializer";
import { IMessage } from "../Message";
import { IRequest } from "../Request";
import Guid, { isGuid } from "../types/Guid";

export default class JsonSerializer implements ISerializer {
	serialize<TMessage extends IMessage>(message: TMessage): IRequest {
		return {
			path: message.getPath(),
			method: message.getMethod(),
			queryString: this._queryString(message.getQueryString()),
			body: this._serialize(message.getBody()),
			needAuthentication: message.needAuthentication(),
			headers: {
				"Content-Type": "application/json"
			}
		} as IRequest;
	}

	private static dateRegexp = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(Z?)/;

	protected _serialize(data: any): string | undefined {
		if (data === undefined) {
			return undefined;
		}
		return JSON.stringify(data, this._jsonStringify);
	}

	private _jsonStringify(key: string, value: any): string {
		if (key && value && isGuid(value)) {
			return value;
		}
		if (key && value && JsonSerializer.dateRegexp.test(value)) {
			let d = new Date(value);
			d = new Date(d.setMinutes(d.getMinutes() - d.getTimezoneOffset()));
			return d.toISOString();
		}
		if (key && value) {
			// force stringify (toString) value
			return "" + value;
		}
		return value;
	}

	private _queryString(data: any): string | undefined {
		if (data === undefined) return undefined;

		const qsKeys = Object.keys(data);
		if (qsKeys.length === 0) return undefined;

		const results: string[] = [];
		qsKeys.forEach((k) => {
			const kStr = k;

			const v = data[k];
			if (v === undefined || v === null) {
				return;
			}

			const vStr = this._serialize(v);
			if (vStr === `"${undefined}"` || vStr === `"${null}"`) {
				return;
			}

			results.push(`${kStr}=${vStr}`);
		});

		if (results.length === 0) return undefined;

		return results.join("&");
	}

	public deserialize<TResponse = any>(data: any): TResponse {
		if (typeof data !== "string") {
			data = JSON.stringify(data);
		}
		const response: TResponse = JSON.parse(data, this._jsonDeserialize);
		return response;
	}

	private _jsonDeserialize(key: string, value: any): any {
		if (
			key &&
			value &&
			typeof key === "string" &&
			typeof value === "string"
		) {
			if (isGuid(value)) {
				return value as Guid;
			}
			if (JsonSerializer.dateRegexp.test(value)) {
				return new Date(value);
			}
		}
		return value;
	}
}
