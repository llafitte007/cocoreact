/* eslint-disable no-unused-vars */
import { ISerializer } from "./ISerializer";
import { IMessage } from "../Message";
import { IRequest } from "../Request";
import { IConverter } from "../Converter";

export default class JsonSerializer implements ISerializer {
	_converters: IConverter[];

	constructor(converters: IConverter[] = []) {
		this._converters = converters;
	}

	serializeMessage<TMessage extends IMessage>(message: TMessage): IRequest {
		return {
			path: message.getPath(),
			method: message.getMethod(),
			queryString: this._queryString(message.getQueryString()),
			body: this.serialize(message.getBody()),
			needAuthentication: message.needAuthentication(),
			headers: {
				"Content-Type": "application/json"
			}
		} as IRequest;
	}

	public serialize(data: any): string | undefined | null {
		if (data === undefined || data === null) return undefined;

		let vStr = JSON.stringify(data, this._jsonStringify);
		if (vStr[0] === '"' && vStr[vStr.length - 1] === '"') {
			vStr = vStr.substr(1, vStr.length - 2);
		}
		return vStr;
	}

	private _jsonStringify = (_key: string, value: any) => {
		if (value) {
			for (let i = 0; i < this._converters.length; i++) {
				const converter = this._converters[i];
				if (converter.canWrite(value)) {
					return converter.write(value);
				}
			}
		}
		return value;
	};

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

			const vStr = this.serialize(v);
			if (!vStr) return;

			results.push(`${kStr}=${this.encodeURI(vStr)}`);
		});

		if (results.length === 0) return undefined;

		return results.join("&");
	}

	protected encodeURI(str: string) {
		return encodeURIComponent(str)
			.replace(/%20/g, " ")
			.replace(/%2C/g, ",");
	}

	public deserialize<TResponse>(data: any): TResponse {
		if (!data) {
			return (undefined as unknown) as TResponse;
		}
		if (typeof data !== "string") {
			data = JSON.stringify(data);
		}
		const response: TResponse = JSON.parse(data, this._jsonDeserialize);
		return response;
	}

	private _jsonDeserialize = (_key: string, value: any) => {
		if (value) {
			for (let i = 0; i < this._converters.length; i++) {
				const converter = this._converters[i];
				if (converter.canRead(value)) {
					return converter.read(value);
				}
			}
		}
		return value;
	};
}
