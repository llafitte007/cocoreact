export default class Url {
	private _name: string;
	private _path: string;
	private _base: string;

	constructor(name: string, path: string, base: string = "") {
		this._name = name;
		this._path = path;
		this._base = base;
	}

	public clone(): Url {
		return new Url(this._name, this._path, this._base);
	}

	public name(): string {
		return this._name;
	}

	public fullPath(): string {
		return this._base + this._path;
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
}
