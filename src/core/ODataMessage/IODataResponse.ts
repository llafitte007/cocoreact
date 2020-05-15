export interface IODataResponse<TResponse> {
	d: { results: TResponse[]; __count: string };
}
