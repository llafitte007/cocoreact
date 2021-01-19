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
			response && response.datas && response.status === this._errorStatus
		);
	}

	parse(response: any): string | IFormError[] | undefined {
		const errors = this._serializer.deserialize<any>(response.datas);
		if (Array.isArray(errors)) {
			return errors as IFormError[];
		} else if (errors.message) {
			return errors.message as string;
		} else if (errors) {
			return errors;
		}
		return undefined;
	}
}
