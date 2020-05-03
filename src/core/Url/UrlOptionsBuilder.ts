import Url from "./Url";
import UrlOptions from "./UrlOptions";

export default class UrlOptionsBuilder {
	private _urls: Url[];
	private _urlsBase: string;

	constructor(urlsBase: string = "") {
		this._urls = [];
		this._urlsBase = urlsBase;
	}

	add(
		nameOrUrl: string | Url,
		path: string | undefined = undefined,
		base: string | undefined = undefined
	): UrlOptionsBuilder {
		if (nameOrUrl instanceof Url) {
			this._add(nameOrUrl);
		} else if (path !== undefined) {
			this._add(new Url(nameOrUrl, path, base ?? this._urlsBase));
		} else {
			throw new Error("invalid input arguments :");
		}
		return this;
	}

	private _add(url: Url): void {
		const name = url.name();
		const sameName = this._urls.find((x) => x.name() === name);
		if (sameName !== undefined) {
			throw Error(
				`Another url exists with same name ${name} and path ${sameName.fullPath()}`
			);
		}

		const path = url.fullPath();
		const samePath = this._urls.find((x) => x.fullPath() === path);
		if (samePath !== undefined) {
			throw Error(
				`Another url exists with same path ${path} and name ${samePath.name()}`
			);
		}

		this._urls.push(url);
	}

	build() {
		return new UrlOptions(this._urls);
	}
}
