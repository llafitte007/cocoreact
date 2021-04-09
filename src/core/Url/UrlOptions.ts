/* eslint-disable no-unused-vars */
import Url from "./Url";

export default class UrlOptions {
	private _url: Url[];

	constructor(url: Url[]) {
		this._url = url;
	}

	public get(urlName: string): Url {
		const url = this._url.find((r) => r.name() === urlName);
		if (url) {
			return url.clone();
		}
		throw Error(`undefined url named "${urlName}"`);
	}

	public fullPath(name: string, params?: Record<string, string>): string {
		const url = this.get(name);
		if (params) {
			url.setParameters(params);
		}
		return url.fullPath();
	}

	public isMatch(
		urlName: string,
		pathname: string,
		parameters: Record<string, string> = {}
	): boolean {
		return this.get(urlName).isMatch(pathname, parameters);
	}
}
