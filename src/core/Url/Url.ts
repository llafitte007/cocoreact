export default class Url {
	private _name: string;
	private _path: string;
	private _base: string;
	private _hash: string | undefined;

	constructor(
		name: string,
		path: string,
		base: string = "",
		hash: string | undefined = undefined
	) {
		this._name = name;
		this._path = path;
		this._base = base;
		this._hash = hash;
	}

	public clone(): Url {
		return new Url(this._name, this._path, this._base);
	}

	public name(): string {
		return this._name;
	}

	public fullPath(): string {
		let hash = this._hash ? `#${this._hash}` : "";
		hash = hash.replace("##", "#"); // case where _hash start with '#'
		return this._base + this._path + hash;
	}

	public isMatch(
		pathname: string,
		parameters: Record<string, string> = {}
	): boolean {
		const copy = this.clone();
		copy.setParameters(parameters);
		return pathname === copy.fullPath();
	}

	public isParameters(): boolean {
		return this._path.indexOf(":") !== -1;
	}

	public setParameters(params: Record<string, string>): Url {
		const keys = Object.keys(params);
		if (keys.length === 0) {
			return this;
		}

		if (!this.isParameters()) {
			throw Error(`Route "${toString}" doesn"t need parameters`);
		}

		keys.forEach((k) => {
			const id = ":" + k;
			const value = params[k];
			this._path = this._path.replace(id, value);
		});

		if (this.isParameters()) {
			throw Error(
				`Route named "${this.name()}" has some parameters not been setted`
			);
		}

		return this;
	}

	public setHash(hash: string | undefined): Url {
		this._hash = hash;
		return this;
	}
}
