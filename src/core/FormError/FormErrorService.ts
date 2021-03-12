/* eslint-disable no-unused-vars */
import { IFormErrorService } from "./IFormErrorService";
import { ISerializer } from "../Serializer";
import { IFormErrorResponse } from "./IFormError";

export default class FormErrorService implements IFormErrorService {
	_errorStatus: number;
	_serializer: ISerializer;

	constructor(errorStatus: number, serializer: ISerializer) {
		this._errorStatus = errorStatus;
		this._serializer = serializer;
	}

	isValid(response: any): boolean {
		return (
			response && response.data && response.status === this._errorStatus
		);
	}

	parse(response: any) {
		const data = this._serializer.deserialize<IFormErrorResponse>(
			response.data
		);
		if (data.datas && Array.isArray(data.datas) && data.datas.length > 0) {
			return data.datas;
		}
		if (data.message) {
			return data.message as string;
		}
		return undefined;
	}
}
