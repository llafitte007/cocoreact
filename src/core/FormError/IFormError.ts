export interface IFormError {
	field?: string;
	message: string;
}

export interface IFormErrorResponse {
	id: string;
	message: string;
	statusCode: number;
	datas?: IFormError[];
	debug?: any;
}
