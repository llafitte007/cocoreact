/* eslint-disable no-unused-vars */
import { IFormErrorService } from "./IFormErrorService";
import { ISerializer } from "../Serializer";
import { IFormError } from "./IFormError";

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

	parse(response: any): string | IFormError[] | undefined {
		const data = this._serializer.deserialize<any>(response.data);
		if (Array.isArray(data)) {
			return data as IFormError[];
		} else if (data.message) {
			return data.message as string;
		} else if (data) {
			return data;
		}
		return undefined;
	}
}
