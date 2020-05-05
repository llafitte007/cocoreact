/* eslint-disable no-unused-vars */
import IFormError from "./core/FormError/IFormError";
import IFormErrorService from "./core/FormError/IFormErrorService";

export default class DefaultFormErrorService implements IFormErrorService {
	isValid(response: any): boolean {
		return response && response.data && response.status === 417;
	}

	parse(response: any): string | IFormError[] | undefined {
		const { data } = response;
		if (Array.isArray(data)) {
			return data as IFormError[];
		} else if (data.message) {
			return data.message as string;
		}
		return undefined;
	}
}
