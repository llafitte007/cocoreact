/* eslint-disable no-unused-vars */
import { ISerializer } from "./core/Serializer";
import { IMessage } from "./core/Message";
import { IRequest } from "./core/Request";
import { IConverter } from "./core/Converters/IConverter";

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
		return JSON.stringify(data, this._jsonStringify);
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
			if (!vStr || vStr === '""') {
				return;
			}

			results.push(`${kStr}=${vStr}`);
		});

		if (results.length === 0) return undefined;

		return results.join("&");
	}

	public deserialize<TResponse>(data: any): TResponse {
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
