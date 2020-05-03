/* eslint-disable no-unused-vars */
import IFormError from "./IFormError";

export default interface IFormErrorService {
	isValid(response: any): boolean;
	parse(response: any): string | IFormError[] | undefined;
}
