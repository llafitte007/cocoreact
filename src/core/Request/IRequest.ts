export type RequestMethod =
	| "GET"
	| "DELETE"
	| "HEAD"
	| "OPTIONS"
	| "POST"
	| "PUT"
	| "PATCH"
	| "LINK"
	| "UNLINK"
	| undefined;

export default interface IRequest {
	path: string;
	method: RequestMethod;
	queryString: string | undefined;
	body: string | undefined;
	needAuthentication: boolean;
	headers: Record<string, string>;
}
